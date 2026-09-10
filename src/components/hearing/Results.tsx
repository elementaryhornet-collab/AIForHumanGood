"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Audiogram } from "./Audiogram";
import { TrendChart } from "./TrendChart";
import { earLabel, formatFrequency } from "@/lib/audiometry";
import {
  ASYMMETRY_DB,
  asymmetry,
  clearAll,
  compare,
  download,
  pta,
  reliability,
  setBaseline,
  toCsv,
  type ChangeDirection,
  type HearingStore,
} from "@/lib/hearing-history";

const TONE: Record<ChangeDirection, { border: string; text: string; word: string }> =
  {
    better: {
      border: "border-success/40 bg-success/10",
      text: "text-success-text",
      word: "Improved",
    },
    steady: {
      border: "border-line-strong bg-background-secondary",
      text: "text-foreground",
      word: "Steady",
    },
    worse: {
      border: "border-warning/50 bg-warning/10",
      text: "text-warning-text",
      word: "Declined",
    },
  };

interface ResultsProps {
  store: HearingStore;
}

export function Results({ store }: ResultsProps) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const latest = store.sessions.at(-1);
  if (!latest) return null;

  const baseline =
    store.sessions.find((s) => s.id === store.baselineId) ?? store.sessions[0];
  const isBaseline = baseline.id === latest.id;
  const comparison = isBaseline ? null : compare(baseline, latest);
  const gap = asymmetry(latest);
  const trust = reliability(latest);
  const noResponses = latest.thresholds.filter((t) => t.noResponse);

  return (
    <div className="space-y-12">
      <section aria-labelledby="change-heading">
        <h2
          id="change-heading"
          className="text-2xl font-bold text-foreground sm:text-3xl"
        >
          What changed
        </h2>

        {isBaseline ? (
          <p className="mt-4 max-w-2xl text-lg text-foreground-secondary">
            This is your baseline. It is the line every future check-in gets
            measured against, so there is nothing to compare yet — come back in a
            week.
          </p>
        ) : (
          <>
            <p className="mt-4 max-w-2xl text-foreground-secondary">
              Comparing{" "}
              {new Date(latest.date).toLocaleDateString()} against your baseline
              of {new Date(baseline.date).toLocaleDateString()}.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(["right", "left"] as const).map((ear) => {
                const change = comparison?.ears[ear];
                if (!change) return null;
                const tone = TONE[change.direction];
                const magnitude = Math.abs(Math.round(change.delta));
                return (
                  <div
                    key={ear}
                    className={`rounded-xl border p-5 ${tone.border}`}
                  >
                    <h3 className="text-lg font-semibold text-foreground">
                      {earLabel(ear)}
                    </h3>
                    <p
                      className={`mt-1 text-2xl font-bold ${tone.text}`}
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {tone.word}
                      {change.direction !== "steady" && ` by ${magnitude}`}
                    </p>
                    <p className="mt-2 text-sm text-foreground-secondary">
                      {change.direction === "steady"
                        ? `Within ${magnitude} of your baseline — normal week-to-week variation.`
                        : change.direction === "better"
                          ? `You responded to tones ${magnitude} quieter than at baseline.`
                          : `Tones had to be ${magnitude} louder than at baseline before you responded.`}
                    </p>
                  </div>
                );
              })}
            </div>

            {comparison && comparison.notable.length > 0 && (
              <div className="mt-6 rounded-xl border border-line p-5">
                <h3 className="font-semibold text-foreground">
                  Individual pitches that moved a lot
                </h3>
                <ul className="mt-3 space-y-1 text-foreground-secondary">
                  {comparison.notable.map((change) => (
                    <li key={`${change.ear}-${change.frequency}`}>
                      {earLabel(change.ear)} at {formatFrequency(change.frequency)}:{" "}
                      {Math.abs(change.delta)}{" "}
                      {change.delta > 0 ? "worse" : "better"} than baseline
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <div className="mt-6 space-y-3">
          {comparison?.setupMismatch && (
            <Note title="Different setup from your baseline">
              Your baseline used “{baseline.setupLabel}” and this check-in used “
              {latest.setupLabel}”. Different headphones or volume can shift every
              number by more than real hearing change would. Treat this
              comparison as unreliable, or make this your new baseline below.
            </Note>
          )}
          {trust === "poor" && (
            <Note title="This check-in looks unreliable">
              You answered {latest.falsePositives} of {latest.catchTrials} silent
              trials, where no tone was played at all. That usually means
              guessing, or background noise being mistaken for tones. Worth
              redoing somewhere quieter.
            </Note>
          )}
          {gap !== null && gap >= ASYMMETRY_DB && (
            <Note title="Your two ears differ noticeably">
              There is a gap of about {Math.round(gap)} between your ears. A
              consistent difference between ears is worth raising with a
              clinician, whatever the trend is doing.
            </Note>
          )}
          {noResponses.length > 0 && (
            <Note title="Some tones got no response">
              No response at{" "}
              {noResponses
                .map((t) => `${formatFrequency(t.frequency)} (${t.ear})`)
                .join(", ")}
              , even at the loudest level this check-in uses. That can mean your
              volume was set low, or that these pitches are genuinely hard for
              you to hear.
            </Note>
          )}
        </div>
      </section>

      <section aria-labelledby="audiogram-heading">
        <h2
          id="audiogram-heading"
          className="text-2xl font-bold text-foreground sm:text-3xl"
        >
          Your latest check-in
        </h2>
        <div className="mt-6">
          <Audiogram session={latest} baseline={isBaseline ? null : baseline} />
        </div>
      </section>

      <section aria-labelledby="trend-heading">
        <h2
          id="trend-heading"
          className="text-2xl font-bold text-foreground sm:text-3xl"
        >
          Week by week
        </h2>
        <div className="mt-6">
          <TrendChart sessions={store.sessions} />
        </div>
      </section>

      <section aria-labelledby="history-heading">
        <h2
          id="history-heading"
          className="text-2xl font-bold text-foreground sm:text-3xl"
        >
          Your check-ins
        </h2>
        <p className="mt-3 max-w-2xl text-foreground-secondary">
          {store.sessions.length}{" "}
          {store.sessions.length === 1 ? "check-in" : "check-ins"}, stored only
          in this browser on this device.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-sm text-foreground-secondary">
                <th scope="col" className="border-b border-line p-3">
                  Date
                </th>
                <th scope="col" className="border-b border-line p-3">
                  Right avg
                </th>
                <th scope="col" className="border-b border-line p-3">
                  Left avg
                </th>
                <th scope="col" className="border-b border-line p-3">
                  Setup
                </th>
                <th scope="col" className="border-b border-line p-3">
                  Baseline
                </th>
              </tr>
            </thead>
            <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
              {[...store.sessions].reverse().map((session) => {
                const right = pta(session, "right");
                const left = pta(session, "left");
                return (
                  <tr key={session.id}>
                    <th scope="row" className="border-b border-line p-3 font-medium">
                      {new Date(session.date).toLocaleDateString()}
                    </th>
                    <td className="border-b border-line p-3">
                      {right === null ? "—" : Math.round(right)}
                    </td>
                    <td className="border-b border-line p-3">
                      {left === null ? "—" : Math.round(left)}
                    </td>
                    <td className="border-b border-line p-3 text-sm text-foreground-secondary">
                      {session.setupLabel || "Not recorded"}
                    </td>
                    <td className="border-b border-line p-3">
                      {session.id === baseline.id ? (
                        <span className="font-medium text-primary">Current</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setBaseline(session.id)}
                          className="rounded text-sm font-medium text-primary underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          Use as baseline
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() =>
              download(
                "hearing-check-ins.csv",
                toCsv(store.sessions),
                "text/csv;charset=utf-8"
              )
            }
          >
            Download as CSV
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              download(
                "hearing-check-ins.json",
                JSON.stringify(store, null, 2),
                "application/json"
              )
            }
          >
            Download as JSON
          </Button>
          {confirmingDelete ? (
            <>
              <Button
                variant="outline"
                className="border-error text-error hover:bg-error/10"
                onClick={() => {
                  clearAll();
                  setConfirmingDelete(false);
                }}
              >
                Yes, delete everything
              </Button>
              <Button variant="ghost" onClick={() => setConfirmingDelete(false)}>
                Keep my results
              </Button>
            </>
          ) : (
            <Button variant="ghost" onClick={() => setConfirmingDelete(true)}>
              Delete all my results
            </Button>
          )}
        </div>
        {confirmingDelete && (
          <p className="mt-3 text-sm text-error" role="alert">
            This erases all {store.sessions.length} check-ins from this browser.
            It cannot be undone — download a copy first if you want to keep them.
          </p>
        )}
        <p className="mt-4 max-w-2xl text-sm text-foreground-secondary">
          The CSV is the version to bring to an audiologist. It carries the raw
          levels, which pitches, which ear, and which setup each reading came
          from.
        </p>
      </section>
    </div>
  );
}

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-warning/50 bg-warning/10 p-5">
      <svg
        className="h-6 w-6 shrink-0 text-warning-text"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-foreground-secondary">{children}</p>
      </div>
    </div>
  );
}
