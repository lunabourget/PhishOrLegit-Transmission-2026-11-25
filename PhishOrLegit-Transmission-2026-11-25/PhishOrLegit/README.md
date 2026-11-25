# Phish or Legit?

Phish or Legit? is the mobile-first digital companion to a physical cybersecurity board game. A player scans a QR code on a physical card and opens a controlled simulation of an email, text message, link, or voicemail. The phone supports investigation and correction; the physical board remains the source of movement, voting, and victory.

The production site is publicly available on GitHub Pages at [lunabourget.github.io/PhishOrLegit-Transmission-2026-11-25](https://lunabourget.github.io/PhishOrLegit-Transmission-2026-11-25/). GitHub Actions republishes it when changes are pushed to `main`.

## Requirements

- Node.js 24 LTS
- pnpm 10 or newer
- Git

The foundation was verified with Node.js 24.14.1, pnpm 10.22.0, and Git 2.50.1 on macOS 26.4.1.

## Start locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The internal component workshop is available at [http://localhost:3000/dev](http://localhost:3000/dev).

## Quality commands

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

`pnpm check` runs the non-browser checks and the production build in order.

## GitHub Pages

Pushing `main` triggers the repository-root workflow at `.github/workflows/deploy-pages.yml`. It builds this app from its subdirectory, detects the repository name, exports it under the matching `/<repository>` base path, and publishes the generated `out/` directory. The final QR codes already use the public URL and must not be changed unless the experience's behavior changes.

## Current routes

- `/` scan-first landing screen
- `/dev` internal design-system workshop
- `/scan/[cardId]` permanent Scan me route, for example `/scan/G-S1`
- `/link/[spaceId]` permanent LINK route, for example `/link/L02`

All 21 Scan me routes (`G-S1`–`G-S7`, `O-S1`–`O-S7`, and `R-S1`–`R-S7`) are implemented on the shared Mail, Messages, and Voicemail engines. All 10 LINK routes (`L01`–`L10`) show controlled link previews and reveal their answers, explanations, and board outcomes after a Click or Report choice.

## Project documentation

- [Complete handoff](HANDOFF.md)
- [Prompt for the next ChatGPT](NEXT-CHATGPT-PROMPT.md)
- [Product](docs/PRODUCT.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Design system](docs/DESIGN-SYSTEM.md)
- [Game rules and source conflicts](docs/GAME-RULES.md)
- [Content and route status](docs/CONTENT-STATUS.md)
- [GitHub Pages deployment and final QR codes](docs/DEPLOYMENT.md)
- [Quality and acceptance criteria](docs/QUALITY.md)
- [Source materials](docs/SOURCE-MATERIALS.md)
- [Physical card and QR audit](docs/PHYSICAL-CARDS.md)
- [ElevenLabs voice scripts](docs/AUDIO-SCRIPTS.md)
- [Roadmap](docs/ROADMAP.md)
- [Session handoff](CLAUDE.md)
- [Change log](CHANGELOG.md)

## Safety and privacy

All people, companies, messages, domains, and accounts in the game are fictional or controlled training content. The application must not collect credentials, payment details, private communications, or other personal data. Sensitive actions stay local and simulated. Simulated phishing links must never navigate to dangerous websites.
