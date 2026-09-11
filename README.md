# AI For Human Good

Website for a nonprofit using AI to build accessible technology. The flagship
initiative is a bone-conduction hearing assist mobile app; the site is built to
carry further initiatives without being restructured around any one of them.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Static export to `out/` |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm test` | Contrast and audiometry test suites |

## Stack

- **Next.js 16** (App Router) with `output: "export"` — the site builds to
  static files, so there is no server at runtime.
- **Tailwind CSS 4**, themed entirely through CSS custom properties in
  `src/app/globals.css`.
- **TypeScript**, and **Inter** loaded via `next/font`.
- Deployed to **Firebase Hosting** (`firebase.json` serves `out/`).

## Weekly hearing check-in

`/hearing-check` is a browser-based pure-tone screening that tracks whether a
visitor's hearing is changing over time. It runs a modified Hughson-Westlake
staircase across six frequencies in each ear and stores results in
`localStorage` — no account, no upload, nothing leaves the device.

A browser cannot calibrate its own output, so the levels it records are **not
dB HL** and mean nothing in absolute terms. They are only comparable to the
same person on the same headphones at the same volume, which is why the feature
is framed as a trend tracker and a screening aid rather than a hearing test.

It therefore ends with a second, optional measurement: a masked threshold,
reported as the signal-to-noise ratio at which a tone stays audible inside a
band of noise. Because a ratio compares two sounds travelling the same signal
path, the device's unknown response applies to both and cancels out — so unlike
the audiogram, that number survives a change of headphones. It is the same
property that lets the WHO's digits-in-noise screener run uncalibrated, and the
reason the clinical Threshold Equalizing Noise test reports a ratio rather than
a level.

## Testing

```bash
npm test
```

- `tests/contrast.test.mjs` parses the design tokens straight out of
  `globals.css` and asserts every foreground/background pairing meets WCAG 2.2
  AA in all four theme states (light, dark, high contrast, high contrast dark).
  Editing the palette cannot silently regress contrast.
- `tests/audiometry.test.cjs` drives the threshold staircase against simulated
  listeners with known hearing, checking it recovers them, spots asymmetry
  between ears, and catches a listener who guesses through the silent trials.

## Accessibility

WCAG 2.2 AA is the floor, not the goal — see `CLAUDE.md` for the full list of
requirements this project holds itself to.
