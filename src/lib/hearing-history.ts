// Storage and trend analysis for the weekly hearing check-in.
//
// Everything lives in localStorage on the visitor's own device. This is health
// information and the site is a static export with no backend, so it never
// leaves the browser — no account, no upload, no analytics on it.

import {
  CHART_FREQUENCIES,
  PROTOCOL_VERSION,
  PTA_FREQUENCIES,
  type Ear,
  type Threshold,
} from "./audiometry";

const STORAGE_KEY = "aifhg.hearing.v1";

/** A change this large in the pure-tone average is worth mentioning to the listener. */
export const PTA_SHIFT_DB = 10;
/** A change this large at any single frequency is worth mentioning. */
export const SINGLE_FREQUENCY_SHIFT_DB = 15;
/** A gap this large between ears warrants a professional opinion regardless of trend. */
export const ASYMMETRY_DB = 15;

export const CHECK_IN_INTERVAL_DAYS = 7;
const STREAK_GRACE_DAYS = 3;
const DAY_MS = 86_400_000;

export interface Session {
  id: string;
  /** ISO timestamp. */
  date: string;
  protocolVersion: number;
  /** Free text: which headphones and volume, so mismatched setups can be flagged. */
  setupLabel: string;
  thresholds: Threshold[];
  catchTrials: number;
  falsePositives: number;
}

export interface HearingStore {
  version: 1;
  baselineId: string | null;
  sessions: Session[];
}

const EMPTY_STORE: HearingStore = { version: 1, baselineId: null, sessions: [] };

export function loadStore(): HearingStore {
  if (typeof window === "undefined") return EMPTY_STORE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STORE;
    const parsed = JSON.parse(raw) as HearingStore;
    if (parsed?.version !== 1 || !Array.isArray(parsed.sessions)) {
      return EMPTY_STORE;
    }
    return parsed;
  } catch {
    // Private browsing, disabled storage, or corrupt JSON — start clean rather than crash.
    return EMPTY_STORE;
  }
}

function persist(store: HearingStore): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    return true;
  } catch {
    return false;
  }
}

// A tiny external store so components can read localStorage through
// useSyncExternalStore. The snapshot has to be referentially stable between
// mutations or React re-renders forever, hence the cache.
let cached: HearingStore | null = null;
const listeners = new Set<() => void>();

export function subscribeToStore(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getStoreSnapshot(): HearingStore {
  if (!cached) cached = loadStore();
  return cached;
}

/** The page is prerendered, where there is no localStorage to read. */
export function getServerStoreSnapshot(): HearingStore {
  return EMPTY_STORE;
}

function commit(next: HearingStore) {
  cached = next;
  for (const listener of listeners) listener();
}

export function saveSession(session: Session): {
  store: HearingStore;
  persisted: boolean;
} {
  const store = getStoreSnapshot();
  const sessions = [...store.sessions, session].sort(
    (a, b) => Date.parse(a.date) - Date.parse(b.date)
  );
  const next: HearingStore = {
    version: 1,
    baselineId: store.baselineId ?? session.id,
    sessions,
  };
  // The result is kept in memory either way, so the check-in still displays
  // when storage is blocked — the caller warns that it will not survive.
  const persisted = persist(next);
  commit(next);
  return { store: next, persisted };
}

export function setBaseline(id: string): HearingStore {
  const next = { ...getStoreSnapshot(), baselineId: id };
  persist(next);
  commit(next);
  return next;
}

export function clearAll(): HearingStore {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // nothing to remove
  }
  commit(EMPTY_STORE);
  return EMPTY_STORE;
}

export function createSession(
  thresholds: Threshold[],
  setupLabel: string,
  catchTrials: number,
  falsePositives: number
): Session {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `s-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: new Date().toISOString(),
    protocolVersion: PROTOCOL_VERSION,
    setupLabel: setupLabel.trim(),
    thresholds,
    catchTrials,
    falsePositives,
  };
}

// ---------------------------------------------------------------------------
// Analysis
// ---------------------------------------------------------------------------

export function thresholdFor(
  session: Session,
  ear: Ear,
  frequency: number
): Threshold | undefined {
  return session.thresholds.find(
    (t) => t.ear === ear && t.frequency === frequency
  );
}

/** Pure-tone average across 500-4000 Hz, the conventional single-number summary. */
export function pta(session: Session, ear: Ear): number | null {
  const levels = PTA_FREQUENCIES.map(
    (f) => thresholdFor(session, ear, f)?.level
  ).filter((l): l is number => typeof l === "number");
  if (levels.length !== PTA_FREQUENCIES.length) return null;
  return levels.reduce((sum, l) => sum + l, 0) / levels.length;
}

export type ChangeDirection = "better" | "worse" | "steady";

export interface FrequencyChange {
  frequency: number;
  ear: Ear;
  from: number;
  to: number;
  /** Positive means the tone had to be louder this time, i.e. worse. */
  delta: number;
  notable: boolean;
}

export interface Comparison {
  from: Session;
  to: Session;
  /** Per-ear PTA change. Positive delta means worse. */
  ears: Record<Ear, { from: number; to: number; delta: number; direction: ChangeDirection } | null>;
  frequencies: FrequencyChange[];
  notable: FrequencyChange[];
  /** Set when the two sessions were recorded on different hardware. */
  setupMismatch: boolean;
}

function direction(delta: number): ChangeDirection {
  if (delta >= PTA_SHIFT_DB) return "worse";
  if (delta <= -PTA_SHIFT_DB) return "better";
  return "steady";
}

export function compare(from: Session, to: Session): Comparison {
  const ears = {} as Comparison["ears"];
  for (const ear of ["left", "right"] as const) {
    const a = pta(from, ear);
    const b = pta(to, ear);
    ears[ear] =
      a === null || b === null
        ? null
        : { from: a, to: b, delta: b - a, direction: direction(b - a) };
  }

  const frequencies: FrequencyChange[] = [];
  for (const ear of ["right", "left"] as const) {
    for (const frequency of CHART_FREQUENCIES) {
      const a = thresholdFor(from, ear, frequency);
      const b = thresholdFor(to, ear, frequency);
      if (!a || !b) continue;
      const delta = b.level - a.level;
      frequencies.push({
        frequency,
        ear,
        from: a.level,
        to: b.level,
        delta,
        notable: Math.abs(delta) >= SINGLE_FREQUENCY_SHIFT_DB,
      });
    }
  }

  return {
    from,
    to,
    ears,
    frequencies,
    notable: frequencies.filter((f) => f.notable),
    setupMismatch:
      Boolean(from.setupLabel) &&
      Boolean(to.setupLabel) &&
      from.setupLabel !== to.setupLabel,
  };
}

/** A large left/right gap can point to something a clinician should look at. */
export function asymmetry(session: Session): number | null {
  const left = pta(session, "left");
  const right = pta(session, "right");
  if (left === null || right === null) return null;
  return Math.abs(left - right);
}

/** Catch trials the listener answered when nothing was played. */
export function reliability(session: Session): "good" | "fair" | "poor" {
  if (session.catchTrials === 0) return "fair";
  const rate = session.falsePositives / session.catchTrials;
  if (rate <= 0.1) return "good";
  if (rate <= 0.3) return "fair";
  return "poor";
}

// ---------------------------------------------------------------------------
// Weekly cadence
// ---------------------------------------------------------------------------

export interface CheckInStatus {
  lastSession: Session | null;
  dueAt: Date | null;
  daysUntilDue: number | null;
  state: "never" | "due" | "overdue" | "upcoming";
  streakWeeks: number;
}

export function checkInStatus(
  store: HearingStore,
  now = new Date()
): CheckInStatus {
  const last = store.sessions.at(-1) ?? null;
  if (!last) {
    return {
      lastSession: null,
      dueAt: null,
      daysUntilDue: null,
      state: "never",
      streakWeeks: 0,
    };
  }

  const dueAt = new Date(
    Date.parse(last.date) + CHECK_IN_INTERVAL_DAYS * DAY_MS
  );
  const daysUntilDue = Math.ceil((dueAt.getTime() - now.getTime()) / DAY_MS);

  return {
    lastSession: last,
    dueAt,
    daysUntilDue,
    state:
      daysUntilDue <= -STREAK_GRACE_DAYS
        ? "overdue"
        : daysUntilDue <= 0
          ? "due"
          : "upcoming",
    streakWeeks: streak(store.sessions, now),
  };
}

function streak(sessions: Session[], now: Date): number {
  if (sessions.length === 0) return 0;
  const limit = (CHECK_IN_INTERVAL_DAYS + STREAK_GRACE_DAYS) * DAY_MS;

  // The streak is already broken if the most recent check-in is too old.
  if (now.getTime() - Date.parse(sessions[sessions.length - 1].date) > limit) {
    return 0;
  }

  let count = 1;
  for (let i = sessions.length - 1; i > 0; i--) {
    const gap = Date.parse(sessions[i].date) - Date.parse(sessions[i - 1].date);
    if (gap > limit) break;
    count++;
  }
  return count;
}

// ---------------------------------------------------------------------------
// Taking the data elsewhere
// ---------------------------------------------------------------------------

export function toCsv(sessions: Session[]): string {
  const rows = [
    ["date", "setup", "ear", "frequency_hz", "relative_level", "no_response"],
  ];
  for (const session of sessions) {
    for (const t of session.thresholds) {
      rows.push([
        session.date,
        session.setupLabel,
        t.ear,
        String(t.frequency),
        String(t.level),
        t.noResponse ? "yes" : "no",
      ]);
    }
  }
  return rows
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
    .join("\n");
}

export function download(filename: string, contents: string, mime: string) {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * A recurring calendar invite is the only reminder a static site can offer —
 * there is no server to send mail and no service worker to push a notification.
 */
export function buildReminderIcs(start: Date, siteUrl: string): string {
  const stamp = (d: Date) =>
    `${d.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AI For Human Good//Hearing Check-in//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:hearing-checkin-${start.getTime()}@aiforhumangood.org`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(new Date(start.getTime() + 15 * 60_000))}`,
    "RRULE:FREQ=WEEKLY",
    "SUMMARY:Weekly hearing check-in",
    `DESCRIPTION:Take your weekly hearing check-in. Use the same headphones and the same volume as last time.\\n\\n${siteUrl}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Weekly hearing check-in",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}
