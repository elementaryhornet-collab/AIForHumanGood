"use client";

import { pta, type Session } from "@/lib/hearing-history";

const RIGHT_COLOR = "var(--color-error)";
const LEFT_COLOR = "var(--color-info)";

const WIDTH = 620;
const HEIGHT = 320;
const MARGIN = { top: 24, right: 84, bottom: 52, left: 60 };
const PLOT_W = WIDTH - MARGIN.left - MARGIN.right;
const PLOT_H = HEIGHT - MARGIN.top - MARGIN.bottom;
const MIN_SPAN = 20;

function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

interface TrendChartProps {
  sessions: Session[];
}

export function TrendChart({ sessions }: TrendChartProps) {
  if (sessions.length < 2) {
    return (
      <p className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-foreground-secondary">
        Your trend appears here after your second check-in. One result on its own
        has nothing to be compared against.
      </p>
    );
  }

  const series = (["right", "left"] as const).map((ear) => ({
    ear,
    label: ear === "right" ? "Right" : "Left",
    color: ear === "right" ? RIGHT_COLOR : LEFT_COLOR,
    values: sessions.map((session) => pta(session, ear)),
  }));

  const all = series
    .flatMap((s) => s.values)
    .filter((v): v is number => v !== null);
  if (all.length === 0) return null;

  let lo = Math.min(...all);
  let hi = Math.max(...all);
  if (hi - lo < MIN_SPAN) {
    const pad = (MIN_SPAN - (hi - lo)) / 2;
    lo -= pad;
    hi += pad;
  } else {
    const pad = (hi - lo) * 0.15;
    lo -= pad;
    hi += pad;
  }

  const x = (index: number) =>
    MARGIN.left +
    (sessions.length === 1 ? PLOT_W / 2 : (index / (sessions.length - 1)) * PLOT_W);
  // Inverted: a lower average means you heard quieter tones, so better rises.
  const y = (value: number) =>
    MARGIN.top + ((value - lo) / (hi - lo)) * PLOT_H;

  const ticks = [lo, lo + (hi - lo) / 2, hi];

  // Sample date labels so they never collide on a long history.
  const labelStep = Math.max(1, Math.ceil(sessions.length / 6));
  const labelled = sessions
    .map((session, index) => ({ session, index }))
    .filter(
      ({ index }) => index % labelStep === 0 || index === sessions.length - 1
    );

  return (
    <figure className="m-0">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full min-w-[480px]"
          role="img"
          aria-label={`Trend of your average hearing level across ${sessions.length} check-ins, from ${shortDate(
            sessions[0].date
          )} to ${shortDate(sessions[sessions.length - 1].date)}, plotted separately for each ear. The same figures are listed in the table below the chart.`}
        >
          <g stroke="var(--foreground-secondary)" opacity="0.22">
            {ticks.map((tick) => (
              <line
                key={tick}
                x1={MARGIN.left}
                y1={y(tick)}
                x2={MARGIN.left + PLOT_W}
                y2={y(tick)}
                strokeWidth="1"
              />
            ))}
          </g>

          <g
            fill="var(--foreground-secondary)"
            fontSize="13"
            fontFamily="var(--font-sans)"
          >
            {ticks.map((tick) => (
              <text
                key={tick}
                x={MARGIN.left - 12}
                y={y(tick) + 4}
                textAnchor="end"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {Math.round(tick)}
              </text>
            ))}
            {labelled.map(({ session, index }) => (
              <text
                key={session.id}
                x={x(index)}
                y={MARGIN.top + PLOT_H + 24}
                textAnchor="middle"
              >
                {shortDate(session.date)}
              </text>
            ))}
            <text
              x={16}
              y={MARGIN.top + PLOT_H / 2}
              textAnchor="middle"
              fontWeight="600"
              transform={`rotate(-90 16 ${MARGIN.top + PLOT_H / 2})`}
            >
              Better ↑
            </text>
          </g>

          {series.map(({ ear, label, color, values }, seriesIndex) => {
            const points = values
              .map((value, index) => ({ value, index }))
              .filter(
                (p): p is { value: number; index: number } => p.value !== null
              );
            if (points.length === 0) return null;
            // Both ears usually end up close together, which would stack the two
            // direct labels on top of each other. Push them apart when they collide.
            const endValues = series
              .map((s) => s.values[s.values.length - 1])
              .filter((v): v is number => v !== null);
            const labelCollides =
              endValues.length === 2 &&
              Math.abs(y(endValues[0]) - y(endValues[1])) < 18;
            const labelShift = labelCollides
              ? seriesIndex === 0
                ? -10
                : 10
              : 0;
            const path = points
              .map(
                (p, i) => `${i === 0 ? "M" : "L"} ${x(p.index)} ${y(p.value)}`
              )
              .join(" ");
            const last = points[points.length - 1];
            return (
              <g key={ear}>
                <path d={path} fill="none" stroke={color} strokeWidth="2" />
                {points.map((p) => (
                  <circle
                    key={p.index}
                    cx={x(p.index)}
                    cy={y(p.value)}
                    r="4"
                    fill="var(--background)"
                    stroke={color}
                    strokeWidth="2"
                  >
                    <title>{`${label} ear, ${shortDate(
                      sessions[p.index].date
                    )}: average ${Math.round(p.value)}`}</title>
                  </circle>
                ))}
                <circle
                  cx={x(last.index)}
                  cy={y(last.value)}
                  r="6"
                  fill={color}
                  stroke="var(--background)"
                  strokeWidth="2"
                />
                <text
                  x={x(last.index) + 14}
                  y={y(last.value) + 5 + labelShift}
                  fill="var(--foreground)"
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="var(--font-sans)"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption className="mt-3 text-sm text-foreground-secondary">
        Your pure-tone average — the mean of 500 Hz through 4 kHz — for each ear,
        check-in by check-in. Higher on the chart means you heard quieter tones.
      </figcaption>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium text-primary">
          View this trend as a table
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              Average hearing level per check-in. Lower numbers mean you heard a
              quieter tone.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="border-b border-gray-200 p-2 text-left">
                  Check-in
                </th>
                <th scope="col" className="border-b border-gray-200 p-2 text-left">
                  Right average
                </th>
                <th scope="col" className="border-b border-gray-200 p-2 text-left">
                  Left average
                </th>
              </tr>
            </thead>
            <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
              {sessions.map((session) => {
                const right = pta(session, "right");
                const left = pta(session, "left");
                return (
                  <tr key={session.id}>
                    <th
                      scope="row"
                      className="border-b border-gray-200 p-2 text-left font-medium"
                    >
                      {new Date(session.date).toLocaleDateString()}
                    </th>
                    <td className="border-b border-gray-200 p-2">
                      {right === null ? "—" : Math.round(right)}
                    </td>
                    <td className="border-b border-gray-200 p-2">
                      {left === null ? "—" : Math.round(left)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
