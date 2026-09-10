# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website for a nonprofit organization focused on using AI for human good. The site supports multiple initiatives with modular, reusable components. Flagship initiative is a bone-conduction hearing assist mobile app.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 with CSS custom properties
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (skip link, header, footer)
│   ├── page.tsx            # Home page
│   ├── about/
│   ├── initiatives/
│   │   └── hearing-accessibility/   # Flagship initiative (static route)
│   ├── hearing-check/      # Weekly hearing check-in tool
│   ├── contact/
│   ├── donate/
│   ├── get-involved/
│   ├── about/
│   ├── accessibility-ethics/
│   └── privacy/
├── components/
│   ├── layout/             # Header, Footer
│   ├── ui/                 # Button, Input (base components)
│   ├── sections/           # Hero, InitiativeCard, CTASection, ImpactMetrics
│   ├── hearing/            # Check-in flow, audiogram and trend charts
│   └── forms/              # ContactForm, NotifyForm
└── lib/
    ├── utils.ts            # cn() helper for class merging
    ├── config.ts           # Contact email
    ├── audiometry.ts       # Tone generation + threshold staircase
    └── hearing-history.ts  # Check-in storage and trend analysis

tests/
├── contrast.test.mjs       # WCAG AA across all four theme states
└── audiometry.test.cjs     # Staircase against simulated listeners
```

Initiative pages are static routes, not a `[slug]` collection — `output: "export"`
means every route is prerendered at build time.

## Design Tokens

Colors defined in `src/app/globals.css` as CSS custom properties:
- Primary: `--color-ocean` (#1e6b7b), `--color-forest` (#2d7d5a)
- Accent: `--color-amber` (#d4a039), `--color-teal` (#3a9d9d)
- All colors have light/dark variants and meet WCAG AA contrast

Theme colors automatically adjust via `prefers-color-scheme: dark` and
`prefers-contrast: high`, including the combination of both.

**Never hardcode a literal color in a component.** Use the semantic tokens, which
flip with the theme: `surface` (cards, inputs), `line` / `line-strong` (borders),
`muted` / `muted-foreground` (subdued fills and text), and `success-text` /
`warning-text` / `teal-text` for badge text on a tint. A Tailwind class such as
`bg-white` or `border-gray-200` only works on one ground and will break the other
theme. `npm test` fails the build if any token pairing drops below AA.

A color name only becomes a utility if it is mapped in the `@theme inline` block.
Names present in `:root` but missing there silently compile to nothing.

## Accessibility Requirements (Non-Negotiable)

- WCAG 2.2 AA compliance minimum
- Keyboard navigation for all interactive elements
- Skip link to main content
- Semantic HTML with ARIA where needed
- Icons always include text labels
- Respects `prefers-reduced-motion`
- Dark mode and high contrast support
- Base font 18px, scales up to 200%

## Component Patterns

**Button**: Supports variants (primary, secondary, accent, outline, ghost), sizes, and can render as link via `href` prop.

**Input/Textarea**: Always require `label` prop for accessibility. Support `error` and `hint` props.

**InitiativeCard**: `href` is optional — an initiative with no page of its own renders as a non-clickable card, with its description shown in full rather than truncated.

**Section components**: Always use `aria-labelledby` with heading IDs for screen reader navigation.
