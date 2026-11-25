# Matériaux sources et ordre d'autorité

L'archive de transmission contient le code du projet et un dossier `source-materials/` séparé. Cette séparation évite de mélanger les fichiers de référence avec les fichiers exécutés par l'application.

## Sources actuelles

| Fichier                                     | Rôle                                                        |
| ------------------------------------------- | ----------------------------------------------------------- |
| `Phish or Legit - cards v9 (70 cards).xlsx` | Source de vérité des 70 cartes et de leurs identifiants     |
| `Phish or Legit_ - Concept Doc.docx`        | Contexte, objectifs pédagogiques et concept initial         |
| `phish-or-legit-board-v10.png`              | Référence visuelle récente du plateau, couleurs et parcours |
| `1Plan de travail 1 1.svg`                  | Logo original fourni par l'équipe                           |

## Prototypes historiques

| Fichier                                                                  | Attention                                                      |
| ------------------------------------------------------------------------ | -------------------------------------------------------------- |
| `Phish or Legit - cards v8.xlsx`                                         | Ancienne base de cartes ; ne pas remplacer v9 avec ce fichier  |
| `Phish or Legit - all cards (print A4 duplex).pdf`                       | Prototype imprimable obsolète avec anciens totaux et pénalités |
| `Phish or Legit - interactive and LINK cards only (print A4 duplex).pdf` | Prototype QR pointant vers l'ancien artefact Claude            |

Ces PDF restent utiles pour les dimensions, le recto-verso et l'aspect graphique. Ils ne doivent pas être envoyés comme fichiers de production.

## Ordre d'autorité

1. Décision explicite la plus récente du porteur de projet.
2. Classeur v9 de 70 cartes.
3. `docs/GAME-RULES.md` et `src/domain/game/rules.ts`.
4. Concept doc.
5. Plateau v10 pour la forme et les couleurs.
6. Classeur v8 et PDF historiques.

## Sources externes non incluses

- Dossier Google Drive connecté à `esteban.pepion@gmail.com`.
- Vidéo pédagogique YouTube utilisée pendant le travail de conception.
- Futurs exports ElevenLabs.
- Future parodie motion design.
- Futur dépôt GitHub et son URL Pages.

Un nouvel intervenant doit demander l'accès séparément s'il a besoin du Drive ou des médias futurs. Le code et les documents présents dans l'archive suffisent pour installer, tester et poursuivre l'application sans ces accès.

## Fichiers générés à ne pas transmettre comme sources

- `node_modules/`
- `.next/`
- `out/`
- `playwright-report/`
- `test-results/`
- journaux et fichiers d'environnement

Ils sont reproductibles avec `pnpm install`, `pnpm build` et les commandes de test.
