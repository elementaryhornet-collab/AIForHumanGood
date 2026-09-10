// Reads the real design tokens out of globals.css and checks every
// foreground/background pairing meets WCAG 2.2 AA in all four theme states.
// Parsing the stylesheet rather than restating hexes means a future palette
// edit cannot silently regress contrast.
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

function block(re) {
  const m = css.match(re);
  if (!m) throw new Error(`could not find token block: ${re}`);
  return Object.fromEntries(
    [...m[1].matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(([, k, v]) => [k, v.trim()])
  );
}

const base = block(/:root\s*\{([\s\S]*?)\n\}/);
const dark = block(/@media \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{([\s\S]*?)\n\s*\}/);
const hc = block(/@media \(prefers-contrast: high\)\s*\{\s*:root\s*\{([\s\S]*?)\n\s*\}/);
const hcDark = block(
  /@media \(prefers-contrast: high\) and \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{([\s\S]*?)\n\s*\}/
);

const themes = {
  light: { ...base },
  dark: { ...base, ...dark },
  "high-contrast": { ...base, ...hc },
  "high-contrast dark": { ...base, ...hc, ...hcDark },
};

function resolve(tokens, name, depth = 0) {
  if (depth > 10) throw new Error(`circular token: ${name}`);
  const raw = tokens[name];
  if (!raw) throw new Error(`undefined token: ${name}`);
  const ref = raw.match(/^var\((--[\w-]+)\)$/);
  return ref ? resolve(tokens, ref[1], depth + 1) : raw;
}

const luminance = (hex) => {
  const c = hex.replace("#", "").match(/../g).map((x) => parseInt(x, 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground token, background token, minimum ratio, description]
const PAIRS = [
  ["foreground", "background", 4.5, "body text"],
  ["foreground-secondary", "background", 4.5, "secondary text"],
  ["foreground", "surface", 4.5, "text on cards and inputs"],
  ["muted-foreground", "surface", 4.5, "hints and placeholders on a surface"],
  ["muted-foreground", "muted", 4.5, "text on a muted fill"],
  ["success-text", "background", 4.5, "success badge"],
  ["warning-text", "background", 4.5, "warning badge"],
  ["teal-text", "background", 4.5, "teal badge"],
  ["accent-foreground", "accent", 4.5, "accent button label"],
  ["primary", "background", 3, "primary UI colour"],
  ["primary-foreground", "primary", 4.5, "primary button label"],
];

let failures = 0;
for (const [name, tokens] of Object.entries(themes)) {
  console.log(`\n${name}`);
  for (const [fg, bg, min, desc] of PAIRS) {
    const r = ratio(resolve(tokens, `--${fg}`), resolve(tokens, `--${bg}`));
    const ok = r >= min;
    if (!ok) failures++;
    console.log(`  ${ok ? "ok  " : "FAIL"}  ${r.toFixed(2)}:1 (min ${min})  ${desc}`);
  }
  // Borders must be visible without being harsh.
  const line = ratio(resolve(tokens, "--line"), resolve(tokens, "--background"));
  const hcTheme = name.startsWith("high-contrast");
  const ok = hcTheme ? line >= 4.5 : line >= 1.25 && line <= 4.5;
  if (!ok) failures++;
  console.log(`  ${ok ? "ok  " : "FAIL"}  ${line.toFixed(2)}:1  hairline visible but not harsh`);
}

console.log(failures ? `\n${failures} contrast failure(s)` : "\nAll contrast checks passed.");
process.exit(failures ? 1 : 0);
