# Application architecture

## Overview

The application uses Next.js App Router for permanent QR routes and a domain-oriented source layout. The route layer composes features. It does not own scenario truth, game rules, scoring, or geometry.

```text
src/
  app/                  Routes, metadata and route composition
  components/
    ios/                Reusable system-style controls
    layout/             Device and viewport composition
    feedback/           Shared feedback components
  features/
    messages/           Messages simulation
    mail/               Mail simulation
    browser/            Controlled browser simulation
    voicemail/          Voicemail and transcript
    investigation/      Drawing and semantic hotspot interaction
    review/             Vote gate, correction and explanations
    quiz/               Final quiz
  data/
    scenarios/          Versioned scenario content
    links/              LINK content
    quiz/               Quiz data
    glossary/           Glossary data
  domain/
    game/               Configurable board rules
    scenarios/          Zod schemas and domain types
    scoring/            Pure outcome functions
  lib/
    geometry/           Stroke and hotspot geometry
    validation/         Shared validation utilities
    utilities/          Framework-independent helpers
  styles/               Tokens and materials
e2e/                    Browser and visual regression tests
public/
  audio/                Authorized generated voice files
  images/               Controlled scenario imagery
  icons/                Project-owned icon assets
```

Only folders needed by the current milestone are populated. New feature folders should be added when their first implementation lands, not as empty architecture theater.

## Data flow

```text
Versioned scenario data
        ↓ Zod validation
Route → feature surface → investigation result
                           ↓
                    physical vote gate
                           ↓
                 pure outcome resolver
                           ↓
             correction + board consequence
```

Scenario data must be validated before rendering. The result resolver accepts facts such as difficulty, vote correctness, Scan me status, leader status, and Spot it success. It returns movement and media consequences without knowing about React.

## Rendering strategy

- Server Components remain the default for route loading and static composition.
- Client Components are limited to interactive controls, media playback, drawing, and local scenario state.
- Dynamic routes use permanent identifiers validated against the versioned catalog.
- Unknown identifiers render the product not-found screen.
- No database is required for the first production version.

## State strategy

Use component state inside a scenario when possible. Add a feature-level store only when several distant interactive surfaces need the same ephemeral state. Zustand is deferred until that need exists. Server or persistent state requires a separate product decision because the application currently promises no personal data collection.

## Testing strategy

- Unit tests validate schemas and pure game outcomes.
- Playwright validates direct QR routes, interaction flow, accessibility-critical selectors, mobile viewport behavior, and visual snapshots.
- Chromium and WebKit run separately.
- A real iPhone remains required before claiming mobile Safari fidelity.
- Visual snapshots are baselines for regression, not proof of Apple pixel parity.

## Deployment boundary

The project is publicly deployed on GitHub Pages through a static Next.js export and a GitHub Actions workflow. The current URL is `https://lunabourget.github.io/PhishOrLegit-Transmission-2026-11-25/`. Project-site deployments automatically use the repository name as their base path, while a `<owner>.github.io` user-site repository stays at the root. No custom domain or paid hosting service is used.

The final GitHub Pages URL and QR codes are part of the physical product contract and are now frozen. Do not regenerate the QR codes unless the experience's behavior changes. Older Claude artifact QR codes remain prototypes and must not be used.

Generated call audio and the motion-design parody are stored as authorized local assets. Runtime flows must not depend on ElevenLabs, YouTube, Claude artifacts, or another external media service.
