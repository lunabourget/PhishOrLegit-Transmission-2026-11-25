# Product roadmap

## Completed foundation

- Next.js 16, React 19, strict TypeScript, Tailwind CSS 4, Motion, and Zod.
- ESLint, Prettier, Vitest, Playwright Chromium, and Playwright WebKit configuration.
- iOS semantic tokens, light and dark appearances, safe areas, motion, and glass materials.
- Initial reusable navigation, button, segmented-control, list, tab-bar, icon, and message-row components.
- Internal component workshop at `/dev`.
- Permanent Scan me and LINK routes with validated v9 identifiers.
- Configurable game rules and pure card-outcome logic.
- Source reconciliation and project documentation.
- Legacy QR fragment compatibility for prototype identifiers.
- Six call scripts with locally hosted M4A audio and revealable transcripts.
- Confirmed Breach rule: every pawn except the triggering pawn moves back 1.
- All seven green Scan me routes implemented from cards v9.
- All seven orange Scan me routes implemented from cards v9.
- All seven red Scan me routes implemented from cards v9.
- Reusable Mail, Messages, Voicemail, physical-vote, clue, correction, and board-consequence engines.

## Milestone 2: one complete Scan me vertical slice

Status: the G-S1 Mail experience, sender inspection, physical-vote gate, semantic Spot it selection, correction, and board consequence are implemented. Freehand annotation and real-iPhone validation remain.

- Implement `G-S1` using the correct Mail or Messages surface.
- Bind sender, domain, link, and content regions to semantic element IDs.
- Add inspect and accessible evidence-selection modes.
- Add SVG or Canvas annotation with Pointer Events.
- Gate answer reveal behind physical-vote confirmation.
- Score vote and Spot it separately.
- Show correction colors and the physical-board consequence.
- Test on Chromium, WebKit, and a real iPhone.

## Milestone 3: scenario engines

Status: the reusable Mail, Messages, and Voicemail renderers are implemented and all 21 Scan me scenarios are connected. Robust freehand hotspot geometry and an automated cards v9 import workflow remain.

- Generalize email, SMS, and voicemail renderers.
- Verify the six local M4A files, playback, waveform, and revealable transcripts on real devices.
- Add robust hotspot geometry, coverage thresholds, duplicate handling, and oversized-mark rejection.
- Add versioned scenario content validation and import workflow from cards v9.

## Milestone 4: LINK flow

Status: all 10 LINK routes have controlled previews, Click/Report choices, and post-choice answers, explanations, and board consequences. Integrating the supplied local motion-design parody for the rickroll outcome remains.

- Integrate the supplied local motion-design parody for the rickroll outcome.

## Milestone 5: review, quiz, and glossary

- Add correction and explanation system across scenario types.
- Add the five-question final quiz from cards v9.
- Add the English cybersecurity glossary and pronunciation support where licensed.

## Milestone 6: production readiness

- Real-device Safari testing and accessibility audit.
- Performance profiling and asset optimization.
- Offline and degraded-mode strategy.
- Use the already-finalized QR codes in the new physical-card artwork; do not regenerate them unless the experience's behavior changes.
- Security and privacy review.
- Maintain the public static export through the GitHub Pages workflow after changes to `main`.
