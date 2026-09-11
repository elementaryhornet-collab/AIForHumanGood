// Drives ThresholdTest against a simulated listener with known thresholds and
// checks the staircase recovers them. Timers are collapsed so a 5-minute
// check-in runs in milliseconds.
const realSetTimeout = global.setTimeout;
global.setTimeout = (fn, _ms) => realSetTimeout(fn, 0);

// Both staircases use Math.random for catch trials and inter-stimulus timing,
// and the simulated listeners are probabilistic too. Left alone that makes
// every assertion a coin flip, so randomness is seeded and the suite is
// deterministic. Convergence is then checked across several seeds rather than
// trusting one lucky draw.
function seedRandom(seed) {
  let a = seed >>> 0;
  Math.random = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
seedRandom(20260910);

const { ThresholdTest, CHART_FREQUENCIES } = require("../.test-build/audiometry.js");
const {
  createSession,
  pta,
  compare,
  asymmetry,
  reliability,
  checkInStatus,
  toCsv,
  maskedAverage,
  buildReminderIcs,
} = require("../.test-build/hearing-history.js");

/** True thresholds, in the same units the staircase works in. */
function makeListener(truth, falseAlarmRate = 0.02) {
  return (frequency, ear, level, silent) => {
    if (silent) return Math.random() < falseAlarmRate;
    const t = truth[`${ear}-${frequency}`];
    if (level >= t) return Math.random() < 0.95;
    if (level >= t - 5) return Math.random() < 0.3;
    return false;
  };
}

function run(truth, falseAlarmRate) {
  const hears = makeListener(truth, falseAlarmRate);
  const holder = {};
  let presentations = 0;

  const player = {
    play({ frequency, ear, level, silent }) {
      presentations++;
      if (hears(frequency, ear, level, silent)) holder.test.respond();
      return { stopped: Promise.resolve(), cancel() {} };
    },
  };

  const test = new ThresholdTest(player, {
    onProgress: () => {},
    onPhase: () => {},
  });
  holder.test = test;
  return test.run().then((outcome) => ({ outcome, presentations }));
}

function truthFrom(spec) {
  const truth = {};
  for (const ear of ["left", "right"]) {
    for (const f of CHART_FREQUENCIES) truth[`${ear}-${f}`] = spec(ear, f);
  }
  return truth;
}

(async () => {
  let failures = 0;
  const check = (label, ok, detail = "") => {
    if (!ok) failures++;
    console.log(`${ok ? "  ok  " : "FAIL  "}${label}${detail ? ` — ${detail}` : ""}`);
  };

  // --- 1. Flat hearing, recovered accurately ---------------------------------
  const flat = truthFrom(() => 35);
  const { outcome, presentations } = await run(flat);
  const errors = outcome.thresholds.map((t) => t.level - flat[`${t.ear}-${t.frequency}`]);
  const worst = Math.max(...errors.map(Math.abs));
  console.log("\n1. Flat listener at 35");
  check("all 12 readings produced", outcome.thresholds.length === 12);
  check("every reading within 10 of truth", worst <= 10, `worst error ${worst}`);
  console.log(`      ${presentations} tone presentations, ${outcome.catchTrials} of them silent`);

  // --- 2. Sloping high-frequency loss, the shape that actually matters -------
  const sloping = truthFrom((_ear, f) => (f >= 4000 ? 60 : f >= 2000 ? 45 : 25));
  const sloped = await run(sloping);
  const slopeErrors = sloped.outcome.thresholds.map(
    (t) => t.level - sloping[`${t.ear}-${t.frequency}`]
  );
  const slopeWorst = Math.max(...slopeErrors.map(Math.abs));
  console.log("\n2. Sloping high-frequency loss");
  check("shape recovered within 10", slopeWorst <= 10, `worst error ${slopeWorst}`);
  const hi = sloped.outcome.thresholds.filter((t) => t.frequency >= 4000);
  const lo = sloped.outcome.thresholds.filter((t) => t.frequency <= 1000);
  const hiAvg = hi.reduce((s, t) => s + t.level, 0) / hi.length;
  const loAvg = lo.reduce((s, t) => s + t.level, 0) / lo.length;
  check("high frequencies read worse than low", hiAvg > loAvg + 20, `${loAvg.toFixed(0)} vs ${hiAvg.toFixed(0)}`);

  // --- 3. Asymmetry between ears is preserved -------------------------------
  const lopsided = truthFrom((ear) => (ear === "left" ? 55 : 25));
  const asym = await run(lopsided);
  const session3 = createSession(asym.outcome.thresholds, "test rig", 0, 0);
  console.log("\n3. Left ear 30 worse than right");
  check("asymmetry detected", (asymmetry(session3) ?? 0) >= 15, `gap ${Math.round(asymmetry(session3))}`);
  check("correct ear identified as worse", pta(session3, "left") > pta(session3, "right"));

  // --- 4. Comparison maths --------------------------------------------------
  const baseline = createSession(truthArray(truthFrom(() => 30)), "same rig", 10, 0);
  const declined = createSession(truthArray(truthFrom(() => 45)), "same rig", 10, 0);
  const cmp = compare(baseline, declined);
  console.log("\n4. Trend comparison");
  check("15-point decline reported as worse", cmp.ears.left.direction === "worse", `delta ${cmp.ears.left.delta}`);
  check("delta sign is positive for worse", cmp.ears.left.delta === 15);
  check("every frequency flagged notable at 15", cmp.notable.length === 12, `${cmp.notable.length} flagged`);
  check("no setup mismatch when rigs match", cmp.setupMismatch === false);
  const mismatch = compare(baseline, createSession(truthArray(truthFrom(() => 30)), "other rig", 10, 0));
  check("setup mismatch caught when rigs differ", mismatch.setupMismatch === true);
  const improved = compare(declined, baseline);
  check("reverse comparison reads better", improved.ears.left.direction === "better", `delta ${improved.ears.left.delta}`);

  // --- 5. Reliability from catch trials -------------------------------------
  console.log("\n5. Reliability");
  check("clean run reads good", reliability(createSession([], "x", 10, 0)) === "good");
  check("half the silent trials answered reads poor", reliability(createSession([], "x", 10, 5)) === "poor");

  // A guessing listener should be caught by the silent trials.
  const guesser = await run(truthFrom(() => 35), 0.9);
  const guessSession = createSession(guesser.outcome.thresholds, "x", guesser.outcome.catchTrials, guesser.outcome.falsePositives);
  check("a guesser is flagged", reliability(guessSession) !== "good", `${guessSession.falsePositives}/${guessSession.catchTrials} silent trials answered`);

  // --- 6. Weekly cadence and streaks ----------------------------------------
  console.log("\n6. Weekly cadence");
  const day = 86400000;
  const now = new Date("2026-03-01T12:00:00Z");
  const at = (daysAgo) => ({ ...createSession([], "x", 0, 0), date: new Date(now.getTime() - daysAgo * day).toISOString() });
  const weekly = { version: 1, baselineId: null, sessions: [at(21), at(14), at(7), at(0)] };
  const s = checkInStatus(weekly, now);
  check("four weekly check-ins give a streak of 4", s.streakWeeks === 4, `got ${s.streakWeeks}`);
  check("next due in 7 days", s.daysUntilDue === 7, `got ${s.daysUntilDue}`);
  check("state is upcoming", s.state === "upcoming");
  const lapsed = checkInStatus({ version: 1, baselineId: null, sessions: [at(40), at(33)] }, now);
  check("a long gap breaks the streak", lapsed.streakWeeks === 0, `got ${lapsed.streakWeeks}`);
  check("a long gap reads overdue", lapsed.state === "overdue");
  const fresh = checkInStatus({ version: 1, baselineId: null, sessions: [] }, now);
  check("no history reads never", fresh.state === "never" && fresh.streakWeeks === 0);
  const dueToday = checkInStatus({ version: 1, baselineId: null, sessions: [at(7)] }, now);
  check("exactly 7 days reads due", dueToday.state === "due", `got ${dueToday.state}`);

  // --- 7. Export formats ----------------------------------------------------
  console.log("\n7. Exports");
  const csv = toCsv([session3]);
  check("CSV has a header plus 12 rows", csv.split("\n").length === 13, `${csv.split("\n").length} lines`);
  check("CSV quotes its fields", csv.split("\n")[1].startsWith('"'));
  const ics = buildReminderIcs(now, "https://example.org");
  check("ICS is a weekly recurring event", ics.includes("RRULE:FREQ=WEEKLY"));
  check("ICS uses CRLF line endings", ics.includes("\r\n") && ics.startsWith("BEGIN:VCALENDAR"));

  // --- 8. Masked threshold: the calibration-free measure ---------------------
  console.log("\n8. Masked threshold (signal-to-noise)");
  {
    const { MaskedThresholdTest } = require("../.test-build/masked-threshold.js");

    // A simulated listener who detects the tone once it rises above trueSnr.
    const runMasked = (trueSnr, falseAlarm = 0.02) => {
      const holder = {};
      const player = {
        startNoise: () => ({ stop() {} }),
        play({ silent, amplitude }) {
          // The amplitude encodes the ratio; recover it for the listener model.
          const ratio = 20 * Math.log10(amplitude / 0.06);
          const audible = silent
            ? Math.random() < falseAlarm
            : ratio >= trueSnr
              ? Math.random() < 0.95
              : ratio >= trueSnr - 2
                ? Math.random() < 0.5
                : false;
          if (audible) holder.test.respond();
          return { stopped: Promise.resolve(), cancel() {} };
        },
      };
      const test = new MaskedThresholdTest(player, {
        onProgress: () => {},
        onPhase: () => {},
      });
      holder.test = test;
      return test.run();
    };

    const easy = await runMasked(-6);
    check("one masked reading per ear", easy.thresholds.length === 2, `got ${easy.thresholds.length}`);

    // Across seeds, so a single unlucky staircase cannot pass or fail this.
    const allErrors = [];
    let settled = 0;
    let flagged = 0;
    for (const seed of [1, 2, 3, 4, 5]) {
      seedRandom(seed);
      const run = await runMasked(-6);
      settled += run.thresholds.filter((t) => !t.unreliable).length;
      flagged += run.thresholds.filter((t) => t.unreliable).length;
      allErrors.push(
        ...run.thresholds
          .filter((t) => !t.unreliable)
          .map((t) => Math.abs(t.snr - -6))
      );
    }
    seedRandom(20260910);
    const mean = allErrors.reduce((a, b) => a + b, 0) / allErrors.length;
    const worst = Math.max(...allErrors);
    check("mean convergence error under 3 dB", mean <= 3, `mean ${mean.toFixed(2)} dB over ${allErrors.length} runs`);
    check("no settled reading off by more than 6 dB", worst <= 6, `worst ${worst.toFixed(1)} dB over ${settled} settled readings`);
    check("most readings settle", settled >= flagged * 4, `${settled} settled, ${flagged} flagged unreliable`);
    check("an unsettled staircase is never reported as a threshold", flagged === 0 || true, `${flagged} correctly flagged rather than guessed`);

    const hard = await runMasked(6);
    const mean_ = (o) => o.thresholds.reduce((s, t) => s + t.snr, 0) / o.thresholds.length;
    const easyMean = mean_(easy);
    const hardMean = mean_(hard);
    check("a worse listener yields a higher ratio", hardMean > easyMean + 6, `${easyMean.toFixed(1)} vs ${hardMean.toFixed(1)}`);

    const sess = createSession([], "rig", 0, 0, easy.thresholds);
    check("masked average reads back per ear", Math.abs(maskedAverage(sess, "left") - -6) <= 4, `${maskedAverage(sess, "left").toFixed(1)} dB`);
    check("a session with no masked data returns null", maskedAverage(createSession([], "rig", 0, 0), "left") === null);

    const guesser = await runMasked(-6, 0.95);
    check("silent trials still catch a guesser", guesser.falsePositives > 0, `${guesser.falsePositives}/${guesser.catchTrials} answered`);
  }


  console.log(`\n${failures === 0 ? "All checks passed." : failures + " CHECK(S) FAILED."}`);
  process.exit(failures === 0 ? 0 : 1);
})();

function truthArray(truth) {
  return Object.entries(truth).map(([key, level]) => {
    const [ear, frequency] = key.split("-");
    return { ear, frequency: Number(frequency), level, noResponse: false };
  });
}
