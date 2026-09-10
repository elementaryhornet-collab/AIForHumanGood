"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { Results } from "./Results";
import { TestRunner } from "./TestRunner";
import type { TestOutcome } from "@/lib/audiometry";
import {
  buildReminderIcs,
  checkInStatus,
  createSession,
  download,
  getServerStoreSnapshot,
  getStoreSnapshot,
  saveSession,
  subscribeToStore,
} from "@/lib/hearing-history";

export function HearingCheckIn() {
  // Read through an external store rather than an effect: this page is
  // prerendered at build time, so the server snapshot is empty and React
  // swaps in the real history once it hydrates.
  const store = useSyncExternalStore(
    subscribeToStore,
    getStoreSnapshot,
    getServerStoreSnapshot
  );

  const [testing, setTesting] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const status = checkInStatus(store);

  const handleComplete = (outcome: TestOutcome, setupLabel: string) => {
    const session = createSession(
      outcome.thresholds,
      setupLabel,
      outcome.catchTrials,
      outcome.falsePositives
    );
    const { persisted } = saveSession(session);
    setSaveFailed(!persisted);
    setTesting(false);
    requestAnimationFrame(() => {
      resultsRef.current?.focus();
      resultsRef.current?.scrollIntoView({ block: "start" });
    });
  };

  if (testing) {
    return (
      <TestRunner
        suggestedSetup={status.lastSession?.setupLabel}
        onComplete={handleComplete}
        onCancel={() => setTesting(false)}
      />
    );
  }

  const dueLine = () => {
    switch (status.state) {
      case "never":
        return "Your first check-in becomes the baseline everything else is measured against.";
      case "due":
        return "Your weekly check-in is due now.";
      case "overdue":
        return `Your check-in is ${Math.abs(
          status.daysUntilDue ?? 0
        )} days overdue. Gaps are fine — the trend just gets coarser.`;
      default:
        return `Next check-in in ${status.daysUntilDue} ${
          status.daysUntilDue === 1 ? "day" : "days"
        }.`;
    }
  };

  return (
    <div className="space-y-12">
      <div className="glass-card p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-foreground">
              {status.state === "never" ? "Start tracking" : "This week"}
            </h2>
            <p className="mt-2 text-lg text-foreground-secondary">{dueLine()}</p>
            {status.lastSession && (
              <p className="mt-2 text-foreground-secondary">
                Last check-in{" "}
                {new Date(status.lastSession.date).toLocaleDateString()}
                {status.lastSession.setupLabel
                  ? ` using ${status.lastSession.setupLabel}.`
                  : "."}
              </p>
            )}
          </div>

          {status.streakWeeks > 1 && (
            <div className="rounded-xl border border-line px-5 py-4 text-center">
              <p
                className="text-3xl font-bold text-primary"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {status.streakWeeks}
              </p>
              <p className="text-sm text-foreground-secondary">weeks in a row</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" onClick={() => setTesting(true)}>
            {status.state === "never"
              ? "Take your first check-in"
              : "Take this week's check-in"}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              download(
                "weekly-hearing-check-in.ics",
                buildReminderIcs(
                  status.dueAt ?? new Date(Date.now() + 7 * 86_400_000),
                  "https://aiforhumangood.org/hearing-check"
                ),
                "text/calendar;charset=utf-8"
              )
            }
          >
            Add a weekly reminder
          </Button>
        </div>
        <p className="mt-3 text-sm text-foreground-secondary">
          The reminder is a calendar invite you download and open — we have no
          account to email you from, and nothing about you leaves this device.
        </p>

        {saveFailed && (
          <p
            className="mt-4 rounded-lg border border-error/40 bg-error/10 p-4 text-error"
            role="alert"
          >
            Your result could not be saved. This browser is blocking local
            storage, which private and incognito windows often do. The check-in
            below is correct, but it will disappear when you close this tab —
            download a copy if you want to keep it.
          </p>
        )}
      </div>

      <div ref={resultsRef} tabIndex={-1}>
        {store.sessions.length > 0 ? (
          <Results store={store} />
        ) : (
          <div className="rounded-xl border border-dashed border-line-strong p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              Nothing tracked yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-foreground-secondary">
              After your first check-in you will see an audiogram here. After
              your second, a trend line showing whether your hearing is holding
              steady.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
