# Game rules and source reconciliation

## Source of truth

The current card and rule authority is `Phish or Legit - cards v9 (70 cards)`, created from the team workbook supplied on 25 November 2026 and updated with the explicit rules in the same request. Rule values live in `src/domain/game/rules.ts` so a later team decision changes configuration rather than visual components.

## Current rules

- 70 cards total: 20 green, 20 orange, 20 red, and 10 LINK.
- Seven Scan me cards per color, for 21 total.
- Correct movement: green +2, orange +3, red +4.
- Wrong normal answer: no movement at every difficulty.
- Wrong Scan me answer: no movement and play the supplied local parody.
- Spot it clue bonus: +1 when allowed; the current leader is not eligible.
- Red cards have no printed clue options.
- Phishing LINK + click: play the parody and move back 3.
- Phishing LINK + report: move forward 2.
- Legit LINK + click: use the shortcut.
- Legit LINK + report: stay.
- Special spaces activate only after forward movement during the player's own turn.
- 2FA cancels the player's next mistake.
- Breach moves every other pawn back 1. The pawn that lands on the Breach space does not move.

## Board and session

- 25 spaces from Inbox to Safe Zone.
- Two to six players.
- Target duration: about 30 minutes.
- All pawns start at Inbox; the youngest player starts.
- If a physical pile is empty, open a question of that difficulty in the app.

## Card procedure

Another player draws from the pile indicated by the active pawn's space, hides the printed answer with the hide piece, and hands the card to the active player. A correct answer moves the pawn by the value printed on the card; a wrong answer leaves it in place. The first pawn to reach Safe Zone wins.

## QR and media decisions

- Final printed QR codes point directly to permanent routes on the GitHub Pages site.
- Final QR codes point to the public GitHub Pages routes and are frozen; change them only if the experience's behavior changes.
- Call scenarios use local M4A audio files with wholly fictional voices.
- Wrong Scan me answers and phishing LINK clicks use the supplied local motion-design parody.
- No experience depends on external streaming media or opens a dangerous destination.

## Content inventory from cards v9

- Scan IDs: `G-S1` through `G-S7`, `O-S1` through `O-S7`, and `R-S1` through `R-S7`.
- LINK IDs: `L01` through `L10`.
- Standard cards: 13 per difficulty.
- Interactive cards: seven per difficulty plus all 10 LINK cards.
- Quiz: five questions remains planned.
- Trap log: nine categories remains planned.

## Recorded scoring assumption

The supplied physical-card example prints `EASY +2 if right`, while the new board has 25 spaces. The v9 workbook and app therefore use +2 / +3 / +4 for green / orange / red. This is the only inferred value in the v9 scoring table and should be confirmed before the final print run.
