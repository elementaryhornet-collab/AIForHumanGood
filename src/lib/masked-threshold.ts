// Masked-threshold screening: how far below a noise masker a tone can still be
// heard, reported as a signal-to-noise ratio in dB.
//
// This exists because the pure-tone test in audiometry.ts cannot be compared
// across devices. A browser has no idea how loud its output actually is, so an
// absolute threshold measured on one headset means nothing on another.
//
// A ratio does not have that problem. The tone and its masker sit in the same
// narrow frequency band and travel the same signal path, so whatever the
// hardware does to one it does to the other, and the ratio between them
// survives. That is the same reasoning behind the WHO's digits-in-noise
// screener, which needs no calibration, and behind the clinical Threshold
// Equalizing Noise test, which reports a signal-to-noise ratio rather than a
// level for exactly this reason.
//
// Fewer frequencies than the pure-tone sweep: this is a second opinion on the
// two bands that matter most, not a replacement for the audiogram.

import { TonePlayer, type Ear, type TestPhase } from "./audiometry";

/**
 * One band per ear, at 4 kHz.
 *
 * This staircase needs far more trials than the audiogram's, so each extra
 * frequency costs minutes. 4 kHz is where noise damage shows up first and
 * where change appears earliest, which makes it the right sentinel for a test
 * whose whole job is detecting change. Adding 1 kHz would give a speech-band
 * figure too, at roughly double the running time.
 */
export const MASKED_FREQUENCIES = [4000] as const;

export const MASKED_PROTOCOL_VERSION = 1;

/** Fixed masker amplitude. The tone moves; the noise never does. */
const NOISE_AMPLITUDE = 0.06;

const START_SNR = 12;
const MAX_SNR = 20;
const MIN_SNR = -30;
const COARSE_STEP = 4;
const FINE_STEP = 2;
// A listener who misses an audible tone now and then sends the staircase back
// up, and with too few reversals it can satisfy its stopping rule while still
// well above threshold. More reversals, and averaging more of the tail, is what
// makes the estimate robust to those lapses.
const REVERSALS_TO_FINISH = 10;
const REVERSALS_TO_AVERAGE = 6;
const REVERSALS_BEFORE_FINE = 2;
const MAX_TRIALS = 60;
const RESPONSE_GRACE_MS = 900;
/** Two pulses, not three: this staircase needs many more trials than the
 *  audiogram, and the tone is being detected rather than matched. */
const PULSES = 2;
const CATCH_TRIAL_RATE = 0.12;

export interface MaskedThreshold {
  frequency: number;
  ear: Ear;
  /** Lower is better: the tone stayed audible further below the noise. */
  snr: number;
  /** True when the tone was never heard even at the most favourable ratio. */
  noResponse: boolean;
  /**
   * Set when the staircase ran out of trials before settling. The number is
   * whatever it had reached, which is not a threshold — treat it as missing.
   */
  unreliable?: boolean;
}

export interface MaskedOutcome {
  thresholds: MaskedThreshold[];
  catchTrials: number;
  falsePositives: number;
}

export interface MaskedProgress {
  stepIndex: number;
  totalSteps: number;
  frequency: number;
  ear: Ear;
}

class AbortedError extends Error {}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Tone amplitude sitting `snr` dB relative to the masker. */
export function amplitudeForSnr(snr: number) {
  return NOISE_AMPLITUDE * Math.pow(10, clamp(snr, MIN_SNR, MAX_SNR) / 20);
}

/**
 * Two-down one-up staircase. Two detections in a row make the tone quieter, a
 * single miss makes it louder, which converges on the ratio heard about 71% of
 * the time — the standard way to pin a masked threshold, and finer-grained
 * than the screening staircase used for the audiogram.
 */
export class MaskedThresholdTest {
  private pending: ((heard: boolean) => void) | null = null;
  private responseOpen = false;
  private aborted = false;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private sleepResolve: (() => void) | null = null;
  private active: { cancel: () => void } | null = null;
  private noise: { stop: () => void } | null = null;

  private catchTrials = 0;
  private falsePositives = 0;

  constructor(
    private player: TonePlayer,
    private callbacks: {
      onProgress: (progress: MaskedProgress) => void;
      onPhase: (phase: TestPhase) => void;
    }
  ) {}

  respond() {
    if (!this.responseOpen) return;
    this.responseOpen = false;
    const resolve = this.pending;
    this.pending = null;
    resolve?.(true);
  }

  abort() {
    this.aborted = true;
    this.active?.cancel();
    this.noise?.stop();
    this.noise = null;
    if (this.timer) clearTimeout(this.timer);
    const resolve = this.pending;
    this.pending = null;
    this.responseOpen = false;
    resolve?.(false);
    const wake = this.sleepResolve;
    this.sleepResolve = null;
    wake?.();
  }

  private sleep(ms: number) {
    return new Promise<void>((resolve) => {
      this.sleepResolve = resolve;
      this.timer = setTimeout(() => {
        this.sleepResolve = null;
        resolve();
      }, ms);
    });
  }

  private async present(
    frequency: number,
    ear: Ear,
    snr: number,
    silent = false
  ): Promise<boolean> {
    if (this.aborted) throw new AbortedError();
    this.callbacks.onPhase("presenting");

    const heard = await new Promise<boolean>((resolve) => {
      this.pending = resolve;
      this.responseOpen = true;
      const handle = this.player.play({
        frequency,
        ear,
        level: 0,
        silent,
        amplitude: amplitudeForSnr(snr),
        pulses: PULSES,
      });
      this.active = handle;
      handle.stopped.then(() => {
        this.callbacks.onPhase("waiting");
        this.timer = setTimeout(() => {
          if (!this.responseOpen) return;
          this.responseOpen = false;
          this.pending = null;
          resolve(false);
        }, RESPONSE_GRACE_MS);
      });
    });

    if (this.timer) clearTimeout(this.timer);
    this.active = null;
    if (this.aborted) throw new AbortedError();

    this.callbacks.onPhase("between");
    await this.sleep(400 + Math.random() * 600);
    if (this.aborted) throw new AbortedError();
    return heard;
  }

  private async findThreshold(
    frequency: number,
    ear: Ear
  ): Promise<MaskedThreshold> {
    // The masker runs continuously through the block so the ear stays adapted
    // to it. Restarting it between tones would change what is being measured.
    this.noise = this.player.startNoise({
      frequency,
      ear,
      amplitude: NOISE_AMPLITUDE,
    });
    await this.sleep(900);

    try {
      let snr = START_SNR;
      let consecutiveHits = 0;
      let lastDirection: "up" | "down" | null = null;
      const reversals: number[] = [];
      // Only reversals from the fine-step phase are close enough to threshold
      // to average. The coarse ones are still travelling towards it.
      const fineReversals: number[] = [];
      let trials = 0;

      while (trials < MAX_TRIALS && reversals.length < REVERSALS_TO_FINISH) {
        if (Math.random() < CATCH_TRIAL_RATE) {
          this.catchTrials++;
          if (await this.present(frequency, ear, snr, true)) this.falsePositives++;
        }

        const heard = await this.present(frequency, ear, snr);
        trials++;
        const step =
          reversals.length >= REVERSALS_BEFORE_FINE ? FINE_STEP : COARSE_STEP;

        const record = (at: number) => {
          reversals.push(at);
          if (step === FINE_STEP) fineReversals.push(at);
        };

        if (heard) {
          consecutiveHits++;
          if (consecutiveHits < 2) continue;
          consecutiveHits = 0;
          if (lastDirection === "up") record(snr);
          lastDirection = "down";
          if (snr - step < MIN_SNR) break;
          snr -= step;
        } else {
          consecutiveHits = 0;
          if (lastDirection === "down") record(snr);
          lastDirection = "up";
          if (snr + step > MAX_SNR) {
            return { frequency, ear, snr: MAX_SNR, noResponse: true };
          }
          snr += step;
        }
      }

      // Without at least two fine-step reversals there is no threshold here,
      // only wherever the staircase happened to stop. Reporting that as a
      // measurement would put a confident-looking number on nothing.
      if (fineReversals.length < 4) {
        return {
          frequency,
          ear,
          snr: Math.round(snr * 10) / 10,
          noResponse: false,
          unreliable: true,
        };
      }
      const tail = fineReversals.slice(-REVERSALS_TO_AVERAGE);
      const mean = tail.reduce((sum, v) => sum + v, 0) / tail.length;
      return {
        frequency,
        ear,
        snr: Math.round(mean * 10) / 10,
        noResponse: false,
      };
    } finally {
      this.noise?.stop();
      this.noise = null;
    }
  }

  async run(): Promise<MaskedOutcome | null> {
    const steps: { ear: Ear; frequency: number }[] = [];
    for (const ear of ["right", "left"] as const) {
      for (const frequency of MASKED_FREQUENCIES) steps.push({ ear, frequency });
    }

    const thresholds: MaskedThreshold[] = [];
    try {
      for (let i = 0; i < steps.length; i++) {
        const { ear, frequency } = steps[i];
        this.callbacks.onProgress({
          stepIndex: i,
          totalSteps: steps.length,
          frequency,
          ear,
        });
        this.callbacks.onPhase("between");
        thresholds.push(await this.findThreshold(frequency, ear));
      }
    } catch (error) {
      if (error instanceof AbortedError) {
        this.callbacks.onPhase("aborted");
        return null;
      }
      throw error;
    }

    this.callbacks.onPhase("done");
    return {
      thresholds,
      catchTrials: this.catchTrials,
      falsePositives: this.falsePositives,
    };
  }
}
