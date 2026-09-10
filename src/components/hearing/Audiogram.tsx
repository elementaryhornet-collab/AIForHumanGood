"use client";

import { CHART_FREQUENCIES, MAX_LEVEL, formatFrequency } from "@/lib/audiometry";
import { thresholdFor, type Session } from "@/lib/hearing-history";

// Right ear is red and marked with a circle, left ear is blue and marked with a
// cross. That is the audiogram convention clinicians already read, and the shape
// means identity never rests on colour alone.
const RIGHT_COLOR = "var(--color-error)";
const LEFT_COLOR = "var(--color-info)";

const WIDTH = 600;
const HEIGHT = 420;
const MARGIN = { top: 28, right: 24, bottom: 80, left: 60 };
const PLOT_W = WIDTH - MARGIN.left - MARGIN.right;
const PLOT_H = HEIGHT - MARGIN.top - MARGIN.bottom;
const LEVEL_TICKS = [0, 15, 30, 45, 60, 75, 90];

/**
 * When both ears land on nearly the same level the two symbols would sit on top
 * of each other and the one drawn second would hide the first. Audiologists nudge
 * them apart by hand; this does the same, and only when they actually collide.
 */
const COLLISION_DB = 6;
const NUDGE = 7;

function x(index: number) {
  return MARGIN.left + (index / (CHART_FREQUENCIES.length - 1)) * PLOT_W;
}

function y(level: number) {
  return MARGIN.top + (level / MAX_LEVEL) * PLOT_H;
}

interface AudiogramProps {
  session: Session;
  baseline?: Session | null;
}

export function Audiogram({ session, baseline }: AudiogramProps) {
  const nudged = CHART_FREQUENCIES.map((frequency) => {
    const right = thresholdFor(session, "right", frequency);
    const left = thresholdFor(session, "left", frequency);
    return (
      right !== undefined &&
      left !== undefined &&
      Math.abs(right.level - left.level) < COLLISION_DB
    );
  });

  const series = (["right", "left"] as const).map((ear) => ({
    ear,
    color: ear === "right" ? RIGHT_COLOR : LEFT_COLOR,
    points: CHART_FREQUENCIES.map((frequency, index) => {
      const t = thresholdFor(session, ear, frequency);
      const base = baseline ? thresholdFor(baseline, ear, frequency) : undefined;
      const offset = nudged[index] ? (ear === "right" ? -NUDGE : NUDGE) : 0;
      return {
        frequency,
        index,
        cx: x(index) + offset,
        level: t?.level ?? null,
        noResponse: t?.noResponse ?? false,
        baselineLevel: base?.level ?? null,
      };
    }),
  }));

  const showBaseline = Boolean(baseline) && baseline?.id !== session.id;
  const caption = showBaseline
    ? "Latest check-in plotted against your baseline. Lower on the chart means you heard a quieter tone."
    : "Your check-in. Lower on the chart means you heard a quieter tone.";

  return (
    <figure className="m-0">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full min-w-[480px]"
          role="img"
          aria-label={`Audiogram of your ${new Date(
            session.date
          ).toLocaleDateString()} check-in, showing the quietest level you responded to at each frequency in each ear. The same figures are listed in the table below the chart.`}
        >
          <g stroke="var(--foreground-secondary)" opacity="0.22">
            {LEVEL_TICKS.map((level) => (
              <line
                key={level}
                x1={MARGIN.left}
                y1={y(level)}
                x2={MARGIN.left + PLOT_W}
                y2={y(level)}
                strokeWidth="1"
              />
            ))}
            {CHART_FREQUENCIES.map((frequency, index) => (
              <line
                key={frequency}
                x1={x(index)}
                y1={MARGIN.top}
                x2={x(index)}
                y2={MARGIN.top + PLOT_H}
                strokeWidth="1"
              />
            ))}
          </g>

          <g
            fill="var(--foreground-secondary)"
            fontSize="13"
            fontFamily="var(--font-sans)"
          >
            {LEVEL_TICKS.map((level) => (
              <text
                key={level}
                x={MARGIN.left - 12}
                y={y(level) + 4}
                textAnchor="end"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {level}
              </text>
            ))}
            {CHART_FREQUENCIES.map((frequency, index) => (
              <text
                key={frequency}
                x={x(index)}
                y={MARGIN.top + PLOT_H + 40}
                textAnchor="middle"
              >
                {formatFrequency(frequency)}
              </text>
            ))}
            <text
              x={MARGIN.left + PLOT_W / 2}
              y={HEIGHT - 14}
              textAnchor="middle"
              fontWeight="600"
            >
              Pitch
            </text>
            <text
              x={16}
              y={MARGIN.top + PLOT_H / 2}
              textAnchor="middle"
              fontWeight="600"
              transform={`rotate(-90 16 ${MARGIN.top + PLOT_H / 2})`}
            >
              Quieter you can hear ↑
            </text>
          </g>

          {showBaseline &&
            series.map(({ ear, color, points }) => {
              const path = points
                .filter((p) => p.baselineLevel !== null)
                .map(
                  (p, i) =>
                    `${i === 0 ? "M" : "L"} ${p.cx} ${y(p.baselineLevel as number)}`
                )
                .join(" ");
              return (
                <path
                  key={`baseline-${ear}`}
                  d={path}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  opacity="0.4"
                />
              );
            })}

          {series.map(({ ear, color, points }) => {
            const drawn = points.filter((p) => p.level !== null);
            const path = drawn
              .map(
                (p, i) =>
                  `${i === 0 ? "M" : "L"} ${p.cx} ${y(p.level as number)}`
              )
              .join(" ");
            return (
              <g key={ear}>
                <path d={path} fill="none" stroke={color} strokeWidth="2" />
                {drawn.map((p) => {
                  const cx = p.cx;
                  const cy = y(p.level as number);
                  const label = `${ear === "right" ? "Right" : "Left"} ear, ${formatFrequency(
                    p.frequency
                  )}: ${p.noResponse ? "no response" : `level ${p.level}`}`;
                  return (
                    <g key={p.frequency}>
                      <title>{label}</title>
                      {ear === "right" ? (
                        <circle
                          cx={cx}
                          cy={cy}
                          r="7"
                          fill="var(--background)"
                          stroke={color}
                          strokeWidth="2.5"
                        />
                      ) : (
                        <>
                          <circle cx={cx} cy={cy} r="8" fill="var(--background)" />
                          <path
                            d={`M ${cx - 6} ${cy - 6} L ${cx + 6} ${cy + 6} M ${cx + 6} ${cy - 6} L ${cx - 6} ${cy + 6}`}
                            stroke={color}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </>
                      )}
                      {p.noResponse && (
                        <path
                          d={`M ${cx} ${cy + 10} L ${cx} ${cy + 20} M ${cx - 4} ${cy + 16} L ${cx} ${cy + 20} L ${cx + 4} ${cy + 16}`}
                          stroke={color}
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                        />
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground-secondary">
        <span className="inline-flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <circle
              cx="10"
              cy="10"
              r="6"
              fill="none"
              stroke={RIGHT_COLOR}
              strokeWidth="2.5"
            />
          </svg>
          Right ear
        </span>
        <span className="inline-flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M5 5 L15 15 M15 5 L5 15"
              stroke={LEFT_COLOR}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          Left ear
        </span>
        {showBaseline && (
          <span className="inline-flex items-center gap-2">
            <svg width="24" height="20" viewBox="0 0 24 20" aria-hidden="true">
              <path
                d="M2 10 L22 10"
                stroke="var(--foreground-secondary)"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
            </svg>
            Baseline
          </span>
        )}
      </div>

      <figcaption className="mt-3 text-sm text-foreground-secondary">
        {caption} An arrow below a point means no response even at the loudest
        level this check-in uses.
      </figcaption>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium text-primary">
          View these results as a table
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              Check-in results by ear and pitch. Lower numbers mean you heard a
              quieter tone.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="border-b border-gray-200 p-2 text-left">
                  Pitch
                </th>
                <th scope="col" className="border-b border-gray-200 p-2 text-left">
                  Right ear
                </th>
                <th scope="col" className="border-b border-gray-200 p-2 text-left">
                  Left ear
                </th>
                {showBaseline && (
                  <>
                    <th
                      scope="col"
                      className="border-b border-gray-200 p-2 text-left"
                    >
                      Right change
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-200 p-2 text-left"
                    >
                      Left change
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
              {CHART_FREQUENCIES.map((frequency) => {
                const right = thresholdFor(session, "right", frequency);
                const left = thresholdFor(session, "left", frequency);
                const rightBase = baseline
                  ? thresholdFor(baseline, "right", frequency)
                  : undefined;
                const leftBase = baseline
                  ? thresholdFor(baseline, "left", frequency)
                  : undefined;
                const delta = (
                  now?: { level: number },
                  then?: { level: number }
                ) => {
                  if (!now || !then) return "—";
                  const d = now.level - then.level;
                  if (d === 0) return "no change";
                  return `${Math.abs(d)} ${d > 0 ? "worse" : "better"}`;
                };
                return (
                  <tr key={frequency}>
                    <th
                      scope="row"
                      className="border-b border-gray-200 p-2 text-left font-medium"
                    >
                      {formatFrequency(frequency)}
                    </th>
                    <td className="border-b border-gray-200 p-2">
                      {right?.noResponse ? "No response" : (right?.level ?? "—")}
                    </td>
                    <td className="border-b border-gray-200 p-2">
                      {left?.noResponse ? "No response" : (left?.level ?? "—")}
                    </td>
                    {showBaseline && (
                      <>
                        <td className="border-b border-gray-200 p-2">
                          {delta(right, rightBase)}
                        </td>
                        <td className="border-b border-gray-200 p-2">
                          {delta(left, leftBase)}
                        </td>
                      </>
                    )}
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
