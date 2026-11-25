# Phish or Legit project handoff

> This file is retained for compatibility with AI coding tools. The current and complete handoff is `HANDOFF.md`. Read it before changing the project.

## Product boundary

This web application extends the physical board game. It must not replace the board, pawns, PHISH and LEGIT vote cards, movement, or victory condition. QR codes need to open a scenario directly, without account creation or onboarding.

The in-app language is English. All brands and identities are fictional. No personal data, credentials, real messages, or real dangerous destinations may be collected or opened.

## Current technical decisions

- Next.js 16 App Router with React 19 and strict TypeScript.
- Node.js 24 LTS and pnpm.
- Tailwind CSS 4 is available for utility styling; precise system components use scoped CSS and shared tokens.
- Motion is used only for tactile feedback and state transitions.
- Zod validates permanent route IDs, scenario data, and game-rule configuration.
- Vitest covers domain logic. Playwright covers Chromium and WebKit mobile flows and visual snapshots.
- Zustand is intentionally not installed. Add it only when shared client state cannot stay local to a feature.
- There is no database, authentication, analytics, or remote data collection.
- Breach affects every pawn except the pawn that landed on the Breach space.
- Final QR codes point directly to permanent routes on GitHub Pages and are generated only after the repository name and Pages URL are frozen.
- Call audio and the motion-design parody are authorized local assets. Do not add runtime dependencies on external media services.

## Source precedence

When sources disagree, use this order until the team decides otherwise:

1. An explicit user decision in the current development request.
2. The latest team Rules Google Doc in Drive folder `02 - Rules & level design`.
3. The latest card database in Drive folder `03 - Cards & printable prototype`.
4. The current concept/context documents.
5. The board image and older local exports.

Never silently resolve a contradiction. Record it in `docs/GAME-RULES.md` and keep the affected rule configurable.

## Verified source state on 2026-11-25

- Connected Drive account: `esteban.pepion@gmail.com`.
- Team Rules document modified 2026-11-24 08:30:47 UTC.
- Current card database: `Phish or Legit - cards v9 (70 cards)`. The earlier v8 workbook and prototype PDFs are historical references only.
- The local Concept Doc is a seven-page export dated 2026-11-23.
- The supplied board screenshot still shows obsolete pile totals and wrong-answer penalties. Treat it as a layout reference, not a rule authority.

## Implementation boundaries

- Data lives under `src/data`.
- Rule configuration lives under `src/domain/game`.
- Scoring and consequence logic lives under `src/domain/scoring`.
- Validation and scenario types live under `src/domain/scenarios`.
- Reusable system UI lives under `src/components/ios`.
- App-specific views live under `src/features`.
- Route composition lives under `src/app`.
- Do not put game rules in visual components.

## Visual standards

- Reference viewport: 402 × 874 CSS pixels.
- Mobile uses the real browser viewport without a fake phone bezel or duplicate status bar.
- Desktop development may show a device frame and simulated status area.
- Liquid Glass belongs to navigation and controls, not content surfaces.
- Use the native system font stack; do not redistribute Apple font files.
- Custom icons are temporary internal SVGs, not redistributed SF Symbols assets.
- Minimum interactive hit target: 44 × 44 CSS pixels.
- Support light mode, dark mode, increased contrast, reduced motion, reduced transparency, and text resizing.

## Current status and next recommended milestone

All 21 Scan me scenarios are implemented and covered by browser tests. The 10 LINK identifiers have stable route shells but still need their controlled browser, Click/Report decision, correction, movement consequence, and local parody integration. After the LINK flow, integrate the six local audio files, the supplied parody, the quiz and glossary, then publish through the prepared GitHub Pages workflow. Real-device iPhone testing remains required.
