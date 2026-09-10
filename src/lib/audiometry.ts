// Pure-tone screening engine.
//
// IMPORTANT: a browser cannot calibrate its own output. Consumer headphones and
// system volume vary by tens of decibels, so the levels produced here are NOT
// dB HL and carry no meaning as absolute numbers. They are only comparable to
// another session recorded on the same hardware at the same volume, which is
// what the weekly check-in is for: tracking change, never diagnosing.

export type Ear = "left" | "right";

/** Test order follows audiometric convention: 1 kHz first as the reference, up, then down. */
export const TEST_FREQUENCIES = [1000, 2000, 4000, 8000, 500, 250] as const;

/** Frequencies averaged into the pure-tone average (PTA), the standard summary figure. */
export const PTA_FREQUENCIES = [500, 1000, 2000, 4000] as const;

/** Ascending order, for charts. */
export const CHART_FREQUENCIES = [250, 500, 1000, 2000, 4000, 8000] as const;

export const PROTOCOL_VERSION = 1;

export const MIN_LEVEL = 0;
export const MAX_LEVEL = 90;
const FIRST_START_LEVEL = 50;
const DOWN_STEP = 10;
const UP_STEP = 5;
const MAX_PRESENTATIONS = 24;

/** Peak amplitude at level 100. Everything below is attenuated from here. */
const REFERENCE_AMPLITUDE = 0.25;

const PULSE_COUNT = 3;
const PULSE_MS = 220;
const PULSE_GAP_MS = 180;
const RAMP_MS = 20;
const RESPONSE_GRACE_MS = 1200;
const CATCH_TRIAL_RATE = 0.14;

export const TONE_DURATION_MS =
  PULSE_COUNT * PULSE_MS + (PULSE_COUNT - 1) * PULSE_GAP_MS;

export interface Threshold {
  frequency: number;
  ear: Ear;
  /** Lower is better: the quietest level the listener responded to. */
  level: number;
  /** True when the listener never responded, even at MAX_LEVEL. */
  noResponse: boolean;
}

export interface TestProgress {
  stepIndex: number;
  totalSteps: number;
  frequency: number;
  ear: Ear;
}

export type TestPhase =
  | "idle"
  | "presenting"
  | "waiting"
  | "between"
  | "done"
  | "aborted";

export interface TestOutcome {
  thresholds: Threshold[];
  catchTrials: number;
  falsePositives: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Level -> linear gain. Higher level means a louder tone, so a higher threshold is worse. */
export function amplitudeForLevel(level: number) {
  return REFERENCE_AMPLITUDE * Math.pow(10, (clamp(level, 0, 100) - 100) / 20);
}

/**
 * Owns the AudioContext. Must be constructed from a user gesture or the browser
 * will refuse to start audio.
 */
export class TonePlayer {
  private ctx: AudioContext | null = null;

  private context() {
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new Ctor();
    }
    return this.ctx;
  }

  async unlock() {
    const ctx = this.context();
    if (ctx.state === "suspended") await ctx.resume();
    return ctx.state === "running";
  }

  /**
   * Plays a pulsed pure tone into one ear only. Routing goes through a
   * ChannelMerger rather than a StereoPanner so the opposite channel is
   * digitally silent — no crosstalk to cue the wrong ear.
   *
   * Gain is ramped in and out: a hard gate produces a broadband click that
   * stays audible far below the tone's own threshold and would invalidate
   * every reading.
   */
  play(options: {
    frequency: number;
    ear: Ear;
    level: number;
    silent?: boolean;
  }): { stopped: Promise<void>; cancel: () => void } {
    const ctx = this.context();
    const merger = ctx.createChannelMerger(2);
    merger.connect(ctx.destination);

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = options.frequency;

    const gain = ctx.createGain();
    gain.gain.value = 0;

    osc.connect(gain);
    gain.connect(merger, 0, options.ear === "left" ? 0 : 1);

    const peak = options.silent ? 0 : amplitudeForLevel(options.level);
    const ramp = RAMP_MS / 1000;
    const pulse = PULSE_MS / 1000;
    const gap = PULSE_GAP_MS / 1000;
    const start = ctx.currentTime + 0.05;

    for (let i = 0; i < PULSE_COUNT; i++) {
      const at = start + i * (pulse + gap);
      gain.gain.setValueAtTime(0, at);
      gain.gain.linearRampToValueAtTime(peak, at + ramp);
      gain.gain.setValueAtTime(peak, at + pulse - ramp);
      gain.gain.linearRampToValueAtTime(0, at + pulse);
    }

    const end = start + PULSE_COUNT * pulse + (PULSE_COUNT - 1) * gap;
    osc.start(start);
    osc.stop(end + 0.05);

    let settle: () => void = () => {};
    const stopped = new Promise<void>((resolve) => {
      settle = resolve;
    });

    const teardown = () => {
      try {
        osc.disconnect();
        gain.disconnect();
        merger.disconnect();
      } catch {
        // already torn down
      }
      settle();
    };

    osc.onended = teardown;

    return {
      stopped,
      cancel: () => {
        try {
          gain.gain.cancelScheduledValues(ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          osc.stop(ctx.currentTime + 0.01);
        } catch {
          // oscillator may not have started
        }
        teardown();
      },
    };
  }

  close() {
    this.ctx?.close().catch(() => {});
    this.ctx = null;
  }
}

class AbortedError extends Error {}

/**
 * Modified Hughson-Westlake: down 10 dB after a response, up 5 dB after a miss,
 * threshold accepted at the lowest level answered twice on the way up.
 */
export class ThresholdTest {
  private pending: ((heard: boolean) => void) | null = null;
  private responseOpen = false;
  private aborted = false;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private active: { cancel: () => void } | null = null;

  private catchTrials = 0;
  private falsePositives = 0;

  constructor(
    private player: TonePlayer,
    private callbacks: {
      onProgress: (progress: TestProgress) => void;
      onPhase: (phase: TestPhase) => void;
    }
  ) {}

  /** Called when the listener presses the response button. */
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
    if (this.timer) clearTimeout(this.timer);
    const resolve = this.pending;
    this.pending = null;
    this.responseOpen = false;
    resolve?.(false);
    // Unblock a pause as well, or run() would hang on a timer that never fires.
    const wake = this.sleepResolve;
    this.sleepResolve = null;
    wake?.();
  }

  private sleepResolve: (() => void) | null = null;

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
    level: number,
    silent = false
  ): Promise<boolean> {
    if (this.aborted) throw new AbortedError();

    this.callbacks.onPhase("presenting");
    const heard = await new Promise<boolean>((resolve) => {
      this.pending = resolve;
      this.responseOpen = true;

      const handle = this.player.play({ frequency, ear, level, silent });
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
    // Randomised so the listener cannot lock onto a rhythm and answer on beat.
    await this.sleep(700 + Math.random() * 1400);
    if (this.aborted) throw new AbortedError();

    return heard;
  }

  private async findThreshold(
    frequency: number,
    ear: Ear,
    startLevel: number
  ): Promise<Threshold> {
    let level = clamp(startLevel, MIN_LEVEL + DOWN_STEP, MAX_LEVEL);
    let ascending = false;
    const ascendingHits = new Map<number, number>();
    let presentations = 0;

    while (presentations < MAX_PRESENTATIONS) {
      // Silent catch trials measure whether the listener is guessing.
      if (Math.random() < CATCH_TRIAL_RATE) {
        this.catchTrials++;
        const falseAlarm = await this.present(frequency, ear, level, true);
        if (falseAlarm) this.falsePositives++;
      }

      const heard = await this.present(frequency, ear, level);
      presentations++;

      if (heard) {
        if (ascending) {
          const hits = (ascendingHits.get(level) ?? 0) + 1;
          ascendingHits.set(level, hits);
          if (hits >= 2) return { frequency, ear, level, noResponse: false };
        }
        if (level - DOWN_STEP < MIN_LEVEL) {
          return { frequency, ear, level: MIN_LEVEL, noResponse: false };
        }
        level -= DOWN_STEP;
        ascending = false;
      } else {
        if (level + UP_STEP > MAX_LEVEL) {
          return { frequency, ear, level: MAX_LEVEL, noResponse: true };
        }
        level += UP_STEP;
        ascending = true;
      }
    }

    // Ran out of presentations: fall back to the lowest level ever answered.
    const answered = [...ascendingHits.keys()];
    return answered.length
      ? { frequency, ear, level: Math.min(...answered), noResponse: false }
      : { frequency, ear, level: MAX_LEVEL, noResponse: true };
  }

  async run(): Promise<TestOutcome | null> {
    const steps: { ear: Ear; frequency: number }[] = [];
    for (const ear of ["right", "left"] as const) {
      for (const frequency of TEST_FREQUENCIES) steps.push({ ear, frequency });
    }

    const thresholds: Threshold[] = [];
    let carried = FIRST_START_LEVEL;

    try {
      for (let i = 0; i < steps.length; i++) {
        const { ear, frequency } = steps[i];
        this.callbacks.onProgress({
          stepIndex: i,
          totalSteps: steps.length,
          frequency,
          ear,
        });
        // A beat before the first tone of each step: it gives the listener time
        // to switch ears, and it lets a screen reader finish announcing the step
        // before a tone plays, so speech never masks the tone being measured.
        this.callbacks.onPhase("between");
        await this.sleep(1100);
        if (this.aborted) throw new AbortedError();

        const result = await this.findThreshold(frequency, ear, carried);
        thresholds.push(result);
        // Start the next frequency just above the last threshold to save presentations.
        carried = clamp(result.level + 15, MIN_LEVEL + DOWN_STEP, MAX_LEVEL);
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

export function formatFrequency(hz: number) {
  return hz >= 1000 ? `${hz / 1000} kHz` : `${hz} Hz`;
}

export function earLabel(ear: Ear) {
  return ear === "left" ? "Left ear" : "Right ear";
}
