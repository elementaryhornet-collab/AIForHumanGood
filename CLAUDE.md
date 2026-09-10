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
│   │   └── [slug]/         # Dynamic initiative pages
│   ├── contact/
│   ├── donate/
│   └── ...
├── components/
│   ├── layout/             # Header, Footer
│   ├── ui/                 # Button, Card, Input (base components)
│   ├── sections/           # Hero, InitiativeCard, CTASection, ImpactMetrics
│   └── forms/              # ContactForm
└── lib/
    └── utils.ts            # cn() helper for class merging
```

## Design Tokens

Colors defined in `src/app/globals.css` as CSS custom properties:
- Primary: `--color-ocean` (#1e6b7b), `--color-forest` (#2d7d5a)
- Accent: `--color-amber` (#d4a039), `--color-teal` (#3a9d9d)
- All colors have light/dark variants and meet WCAG AA contrast

Theme colors automatically adjust via `prefers-color-scheme: dark` and `prefers-contrast: high`.

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

**Card**: Supports variants (default, glass, outlined). Glass variant uses glassmorphism with `backdrop-filter`.

**Input/Textarea**: Always require `label` prop for accessibility. Support `error` and `hint` props.

**Section components**: Always use `aria-labelledby` with heading IDs for screen reader navigation.
