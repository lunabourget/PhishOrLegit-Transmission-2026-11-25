# Physical card audit

## Files reviewed

The print-ready PDFs dated 24 November 2026 were rendered page by page and every QR code was decoded. The print layout is visually clean and uses A4 pages, duplex printing, long-edge flipping, and 100% scale.

## Audited prototype inventory

| Pile   | Standard cards |    Interactive cards | Printed total | Printed wrong score |
| ------ | -------------: | -------------------: | ------------: | ------------------: |
| Green  |              9 | 3 (`G-S1` to `G-S3`) |            12 |                   0 |
| Orange |             15 | 5 (`O-S1` to `O-S5`) |            20 |                  -1 |
| Red    |             12 | 4 (`R-S1` to `R-S4`) |            16 |                  -2 |
| LINK   |              0 |   8 (`L01` to `L08`) |             8 |      rule-dependent |

This table records the obsolete prototype PDFs only. The v9 production inventory is 20 cards per difficulty (13 standard and seven Scan me), 10 LINK cards, and zero movement on a wrong normal answer.

## QR targets

All 20 printed QR codes decode successfully. They target one Claude artifact with a lowercase fragment:

```text
https://claude.ai/artifact/JU7z6rDyUfeAggZjEWQ2L5#g-s1
...
https://claude.ai/artifact/JU7z6rDyUfeAggZjEWQ2L5#r-s4
https://claude.ai/artifact/JU7z6rDyUfeAggZjEWQ2L5#l01
...
https://claude.ai/artifact/JU7z6rDyUfeAggZjEWQ2L5#l08
```

They do not currently open the Next.js application. They are prototype QR codes and will be replaced before the final print run. The app now accepts equivalent fragments on its own root URL and redirects them to permanent routes, for example:

```text
https://USER.github.io/REPOSITORY/#g-s1 -> /scan/G-S1
https://USER.github.io/REPOSITORY/#l01  -> /link/L01
```

Production decision: deploy on GitHub Pages without a custom domain and generate new QR codes at the last responsible moment, after the repository name is frozen. The final URLs should use direct permanent paths such as `https://USER.github.io/REPOSITORY/scan/G-S1/` and `https://USER.github.io/REPOSITORY/link/L01/`. The printed codes must be decoded and smoke-tested on iOS and Android before the cards are sent to print.

## Current production target

Decision recorded on 25 November 2026: cards v9 is authoritative. The final physical files must contain 20 cards per difficulty, seven Scan me cards per difficulty, 10 LINK cards, and zero movement after every wrong normal answer. Correct movement is +2 / +3 / +4, pending final confirmation of the inferred orange value. The audited PDFs remain prototype references and must not be sent as the final print files.
