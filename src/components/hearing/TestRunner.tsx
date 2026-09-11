"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  ThresholdTest,
  TonePlayer,
  earLabel,
  formatFrequency,
  type Ear,
  type TestOutcome,
  type TestPhase,
  type TestProgress,
} from "@/lib/audiometry";
import {

  MaskedThresholdTest,
  type MaskedOutcome,
} from "@/lib/masked-threshold";

type Step = "setup" | "sides" | "volume" | "test" | "masked-intro" | "masked";

const CALIBRATION_LEVEL = 55;

interface TestRunnerProps {
  suggestedSetup?: string;
  onComplete: (
    outcome: TestOutcome,
    setupLabel: string,
    masked?: MaskedOutcome
  ) => void;
  onCancel: () => void;
}

export function TestRunner({
  suggestedSetup,
  onComplete,
  onCancel,
}: TestRunnerProps) {
  const [step, setStep] = useState<Step>("setup");
  const [setupLabel, setSetupLabel] = useState(suggestedSetup ?? "");
  const [quietRoom, setQuietRoom] = useState(false);
  const [headphonesOn, setHeadphonesOn] = useState(false);

  const [sideTarget, setSideTarget] = useState<Ear>("left");
  const [sideRound, setSideRound] = useState(0);
  const [sideMessage, setSideMessage] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);

  const [progress, setProgress] = useState<TestProgress | null>(null);
  const [phase, setPhase] = useState<TestPhase>("idle");
  const [announcement, setAnnouncement] = useState("");

  const [pureOutcome, setPureOutcome] = useState<TestOutcome | null>(null);

  const playerRef = useRef<TonePlayer | null>(null);
  const testRef = useRef<ThresholdTest | null>(null);
  const maskedRef = useRef<MaskedThresholdTest | null>(null);

  const player = useCallback(() => {
    if (!playerRef.current) playerRef.current = new TonePlayer();
    return playerRef.current;
  }, []);

  useEffect(() => {
    return () => {
      testRef.current?.abort();
      maskedRef.current?.abort();
      playerRef.current?.close();
    };
  }, []);

  const playSideTone = useCallback(
    async (ear: Ear) => {
      try {
        const ok = await player().unlock();
        if (!ok) {
          setAudioError(
            "Your browser blocked audio. Check that this tab is not muted, then try again."
          );
          return;
        }
        setAudioError(null);
        player().play({ frequency: 1000, ear, level: CALIBRATION_LEVEL });
      } catch {
        setAudioError(
          "This browser could not start audio. Try Chrome, Edge, Safari or Firefox on a device with headphones."
        );
      }
    },
    [player]
  );

  const beginSides = async () => {
    const first: Ear = Math.random() < 0.5 ? "left" : "right";
    setSideTarget(first);
    setSideRound(0);
    setSideMessage(null);
    setStep("sides");
    await playSideTone(first);
  };

  const answerSide = async (answer: Ear) => {
    if (answer !== sideTarget) {
      setSideMessage(
        `That tone played in your ${sideTarget} ear. Check that your headphones are the right way round, then try again.`
      );
      await playSideTone(sideTarget);
      return;
    }
    if (sideRound === 0) {
      const next: Ear = sideTarget === "left" ? "right" : "left";
      setSideTarget(next);
      setSideRound(1);
      setSideMessage("Correct. Here is the other side.");
      await playSideTone(next);
      return;
    }
    setSideMessage(null);
    setStep("volume");
    await playSideTone("left");
  };

  const startTest = async () => {
    const ok = await player().unlock();
    if (!ok) {
      setAudioError("Your browser blocked audio. Check the tab is not muted.");
      return;
    }
    setStep("test");
    setPhase("between");

    const test = new ThresholdTest(player(), {
      onProgress: (p) => {
        setProgress(p);
        setAnnouncement(
          `Step ${p.stepIndex + 1} of ${p.totalSteps}. ${earLabel(
            p.ear
          )}, ${formatFrequency(p.frequency)}.`
        );
      },
      onPhase: setPhase,
    });
    testRef.current = test;

    const outcome = await test.run();
    testRef.current = null;
    if (!outcome) return;
    // The masked test is offered rather than imposed: it adds about two
    // minutes, and the audiogram above already stands on its own.
    setPureOutcome(outcome);
    setProgress(null);
    setStep("masked-intro");
  };

  const startMasked = async () => {
    if (!pureOutcome) return;
    setStep("masked");
    setPhase("between");

    const test = new MaskedThresholdTest(player(), {
      onProgress: (p) => {
        setProgress({ ...p });
        setAnnouncement(
          `Noise test, step ${p.stepIndex + 1} of ${p.totalSteps}. ${earLabel(
            p.ear
          )}, ${formatFrequency(p.frequency)}.`
        );
      },
      onPhase: setPhase,
    });
    maskedRef.current = test;

    const masked = await test.run();
    maskedRef.current = null;
    onComplete(pureOutcome, setupLabel, masked ?? undefined);
  };

  const skipMasked = () => {
    if (pureOutcome) onComplete(pureOutcome, setupLabel);
  };

  const stopTest = () => {
    testRef.current?.abort();
    testRef.current = null;
    onCancel();
  };

  // Abandoning the noise test keeps the audiogram that was already measured.
  const stopMasked = () => {
    maskedRef.current?.abort();
    maskedRef.current = null;
    skipMasked();
  };

  // -------------------------------------------------------------------------

  if (step === "setup") {
    const ready = quietRoom && headphonesOn;
    return (
      <div className="glass-card p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-foreground">
          Before you start
        </h2>
        <p className="mt-3 text-foreground-secondary">
          A check-in takes about five minutes. It only tells you something useful
          if you repeat it the same way each week, so the two questions below
          matter more than they look.
        </p>

        <ul className="mt-6 space-y-3">
          {[
            {
              checked: headphonesOn,
              set: setHeadphonesOn,
              id: "confirm-headphones",
              label: "I am wearing headphones or earbuds",
              hint: "Speakers make the result meaningless — both ears hear both channels.",
            },
            {
              checked: quietRoom,
              set: setQuietRoom,
              id: "confirm-quiet",
              label: "I am somewhere quiet",
              hint: "Background noise hides quiet tones and will look like hearing loss.",
            },
          ].map((item) => (
            <li key={item.id}>
              <label
                htmlFor={item.id}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-4 transition-colors hover:bg-muted/60"
              >
                <input
                  type="checkbox"
                  id={item.id}
                  checked={item.checked}
                  onChange={(e) => item.set(e.target.checked)}
                  className="mt-1 h-5 w-5 shrink-0 accent-[var(--primary)]"
                />
                <span>
                  <span className="block font-medium text-foreground">
                    {item.label}
                  </span>
                  <span className="block text-sm text-foreground-secondary">
                    {item.hint}
                  </span>
                </span>
              </label>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Input
            label="Which headphones and device?"
            id="setup-label"
            value={setupLabel}
            onChange={(e) => setSetupLabel(e.target.value)}
            placeholder="e.g. Sony XM4 on my laptop, volume 50%"
            hint="Written down so we can warn you if a later check-in uses a different setup — results from different headphones cannot be compared."
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={beginSides} disabled={!ready} size="lg">
            Continue
          </Button>
          <Button onClick={onCancel} variant="ghost" size="lg">
            Cancel
          </Button>
        </div>
        {!ready && (
          <p className="mt-3 text-sm text-foreground-secondary">
            Confirm both boxes above to continue.
          </p>
        )}
      </div>
    );
  }

  if (step === "sides") {
    return (
      <div className="glass-card p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-foreground">
          Which ear did that play in?
        </h2>
        <p className="mt-3 text-foreground-secondary">
          This checks your headphones are the right way round. Getting it
          backwards would swap your two ears in every chart from here on.
        </p>

        {audioError && (
          <p className="mt-4 rounded-lg border border-error/40 bg-error/10 p-4 text-error" role="alert">
            {audioError}
          </p>
        )}

        <p className="mt-4 min-h-[1.75rem] text-foreground" aria-live="polite">
          {sideMessage}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button onClick={() => answerSide("left")} variant="outline" size="lg">
            Left ear
          </Button>
          <Button onClick={() => answerSide("right")} variant="outline" size="lg">
            Right ear
          </Button>
          <Button
            onClick={() => playSideTone(sideTarget)}
            variant="ghost"
            size="lg"
          >
            Play it again
          </Button>
        </div>

        <div className="mt-8">
          <Button onClick={onCancel} variant="ghost">
            Cancel check-in
          </Button>
        </div>
      </div>
    );
  }

  if (step === "volume") {
    return (
      <div className="glass-card p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-foreground">Set your volume</h2>
        <p className="mt-3 text-foreground-secondary">
          Play the tone and set your device volume so it is clearly audible but
          never loud. Use this same volume every week — if you change it, your
          results stop being comparable.
        </p>
        <p className="mt-3 text-foreground-secondary">
          Nothing in the check-in will be louder than roughly ten times this
          tone. Stop straight away if anything is uncomfortable.
        </p>

        {audioError && (
          <p className="mt-4 rounded-lg border border-error/40 bg-error/10 p-4 text-error" role="alert">
            {audioError}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => playSideTone("left")} variant="outline" size="lg">
            Play tone
          </Button>
          <Button onClick={startTest} size="lg">
            Volume is right — start
          </Button>
        </div>

        <div className="mt-8">
          <Button onClick={onCancel} variant="ghost">
            Cancel check-in
          </Button>
        </div>
      </div>
    );
  }

  if (step === "masked-intro") {
    return (
      <div className="glass-card p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-foreground">
          Audiogram done. One more, worth two minutes
        </h2>
        <p className="mt-3 text-foreground-secondary">
          What you just took measures the quietest tone you can hear. It is
          useful week to week, but it cannot travel: a browser has no idea how
          loud your headphones actually are, so those numbers mean nothing on a
          different device.
        </p>
        <p className="mt-3 text-foreground-secondary">
          This next one measures something that does travel — how far below a
          background noise a tone can still be picked out. Because it is a
          ratio between two sounds going through the same headphones, whatever
          your hardware does to one it does to the other, and the result holds
          up even if you switch devices. It is the same reason the World Health
          Organisation&rsquo;s hearing screener works without calibration.
        </p>
        <p className="mt-3 text-foreground-secondary">
          You will hear a steady hiss, and quiet tones inside it. Press the
          button whenever you catch one. One pitch in each ear, a little over
          two minutes. It asks more of you than the audiogram did — the tones
          get genuinely hard to pick out, and that is the point.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" onClick={startMasked}>
            Take the noise test
          </Button>
          <Button size="lg" variant="outline" onClick={skipMasked}>
            Skip — save what I have
          </Button>
        </div>
        <p className="mt-3 text-sm text-foreground-secondary">
          Skipping is fine. Your audiogram is already recorded either way.
        </p>
      </div>
    );
  }

  const isMasked = step === "masked";
  const total = progress?.totalSteps ?? (isMasked ? 4 : 12);
  const done = progress?.stepIndex ?? 0;
  const percent = Math.round((done / total) * 100);

  return (
    <div className="glass-card p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-foreground">
        {isMasked ? "Noise test" : "Listening test"}
      </h2>

      <div className="mt-6">
        <div className="flex items-baseline justify-between text-sm text-foreground-secondary">
          <span>
            Step {done + 1} of {total}
          </span>
          <span>
            {progress
              ? `${earLabel(progress.ear)} · ${formatFrequency(progress.frequency)}`
              : "Getting ready"}
          </span>
        </div>
        <div
          className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`Step ${done + 1} of ${total}`}
        >
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <p className="mt-8 text-lg text-foreground">
        {isMasked
          ? "A steady hiss will play. Press the button whenever you catch a tone inside it. The tone gets harder to pick out as you go, and some trials have no tone at all."
          : "Press the button the moment you hear a tone, however faint. Most tones will be very quiet, and some are so quiet you will hear nothing at all — that is expected, so wait rather than guess."}
      </p>

      <button
        type="button"
        onClick={() =>
          isMasked ? maskedRef.current?.respond() : testRef.current?.respond()
        }
        className="mt-6 w-full rounded-xl bg-primary px-8 py-10 text-2xl font-bold text-primary-foreground transition-colors hover:bg-ocean-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        I heard it
      </button>
      <p className="mt-3 text-sm text-foreground-secondary">
        The space bar and enter key work too, once this button has focus.
      </p>

      <p className="mt-6 text-foreground-secondary">
        <span className="font-medium text-foreground">
          {phase === "presenting" || phase === "waiting"
            ? "Listen now"
            : "Wait for the next tone"}
        </span>
      </p>

      {/* Step announcements land in the pause before each tone, never over one. */}
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      <div className="mt-8 border-t border-line pt-6">
        <Button onClick={isMasked ? stopMasked : stopTest} variant="ghost">
          {isMasked
            ? "Stop — keep my audiogram, skip this part"
            : "Stop and discard this check-in"}
        </Button>
      </div>
    </div>
  );
}
