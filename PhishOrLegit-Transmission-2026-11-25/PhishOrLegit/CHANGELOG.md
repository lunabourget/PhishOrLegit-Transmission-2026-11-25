# Changelog

## Unreleased

### Added

- Legacy printed-card fragment routing for Scan me and LINK identifiers.
- ElevenLabs-ready scripts and stable local asset paths for all five v8 call scenarios.
- Physical card and QR audit documentation.
- Complete G-S1 Mail experience with sender inspection, physical-vote gate, semantic Spot it selection, correction, and board consequence.
- Complete G-S2 Messages and G-S3 Voicemail experiences on the shared scan review engine.
- Complete G-S4 Mail and G-S5 Voicemail experiences, finishing the five green Scan me routes.
- Complete O-S1 through O-S5 experiences, finishing the five orange Scan me routes.
- Complete R-S1 through R-S5 experiences, finishing all 15 Scan me routes from cards v8.
- Reusable Mail, Messages, and Voicemail scenario renderers shared by multiple cards.
- Cards v9 content workbook with 70 fully written cards: 20 per difficulty and 10 LINK cards.
- G-S6, G-S7, O-S6, O-S7, R-S6, and R-S7 interactive experiences, completing all 21 Scan me routes.
- L09 and L10 permanent LINK routes.
- ElevenLabs-ready O-S6 school IT script.
- Official Phish or Legit app logo on the launch screen and browser metadata.
- In-app QR scanner with rear-camera preference, internal route validation, and manual card-code fallback.
- GitHub Pages static export, repository-aware base path, prerendered card routes, and automatic deployment workflow.
- Complete transfer kit with project handoff, next-ChatGPT prompt, content inventory, deployment guide, QA checklist, and source-material classification.

### Changed

- Breach now moves every pawn except the pawn that triggered the space back 1.
- Production QR codes will point directly to the final application domain.
- Rickroll feedback will use a supplied local motion-design parody.
- Cards v9 is the current content and scoring authority; prototype board and print files must be regenerated.
- Refined the scan interfaces around the official iOS 27 visual language: transparent navigation, Liquid Glass controls, hardware-informed curvature, specular highlights, native content materials, and accurate status indicators.
- Updated the shared scoring engine for the 25-space board: green +2, orange +3, and red +4 when correct; zero movement after every wrong answer.
- Matched the physical board palette for green, orange, red, LINK teal, and 2FA blue while preserving the iOS glass interface.

## 0.1.0 - 2026-11-24

### Added

- Production Next.js 16 project foundation with strict TypeScript.
- Tailwind CSS 4, Motion, Zod, ESLint, Prettier, Vitest, and Playwright configuration.
- Semantic iOS-style colors, typography, spacing, geometry, safe areas, materials, and motion tokens.
- Reusable navigation, glass button, icon button, segmented control, system list, tab bar, icon, and conversation-preview components.
- Scan-first landing page and internal component workshop.
- Permanent route shells for all v8 Scan me and LINK identifiers.
- Versioned game-rule configuration and tested card-outcome resolver.
- Product, architecture, design-system, rules, roadmap, and session-handoff documentation.

### Documented

- The obsolete v6 URL in the initialization prompt.
- The Breach target conflict.
- Obsolete pile totals and wrong-answer penalties in the supplied board screenshot.
- The initial deployment assumptions, later superseded by the course-project decision to use GitHub Pages without a custom domain.

### Deferred

- Zustand until a real shared-state requirement appears.
- Database, authentication, analytics, and deployment.
- Full scenario interfaces, annotation geometry, media, correction, quiz, and glossary.
