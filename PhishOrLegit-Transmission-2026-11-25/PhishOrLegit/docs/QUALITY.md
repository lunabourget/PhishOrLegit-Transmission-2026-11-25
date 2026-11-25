# Qualité, tests et critères d'acceptation

Dernière exécution complète : 25 novembre 2026.

## Résultat actuel

- Formatage Prettier : réussi.
- ESLint sans avertissement : réussi.
- TypeScript strict : réussi.
- Vitest : 24 tests réussis dans 10 fichiers.
- Build Next.js : réussi, 35 pages statiques générées.
- Export GitHub Pages avec base path `/PhishOrLegit` : réussi.
- Playwright : 58 tests réussis.
- Navigateurs Playwright : Chromium avec viewport iPhone 16 Pro et WebKit iPhone.
- Validation sur véritable iPhone : encore requise.

## Commandes

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

La commande suivante regroupe les contrôles non navigateur et le build :

```bash
pnpm check
```

Pour régénérer volontairement les captures de référence :

```bash
pnpm test:e2e:update
```

Ne pas accepter automatiquement de nouvelles captures. Les comparer visuellement avant de les valider.

## Couverture fonctionnelle E2E

- Écran d'accueil scan-first.
- Saisie manuelle de secours du scanner.
- Laboratoire de composants `/dev`.
- Routes permanentes Scan me et LINK.
- Redirection des anciens fragments QR.
- Parcours positifs des 21 scénarios Scan me.
- Cas de mauvaise réponse et zéro déplacement.
- Transcript accessible pour les appels.
- Parcours Spot it et correction.

## Critères avant publication publique

- `pnpm check` et `pnpm test:e2e` passent sur le commit publié.
- Le workflow GitHub Pages est vert.
- L'accueil et les 31 routes permanentes répondent sous l'URL GitHub Pages.
- Le scanner fonctionne sur HTTPS et la saisie manuelle reste disponible.
- Aucun lien simulé ne quitte l'application vers une destination dangereuse.
- Les médias locaux ne produisent pas d'erreur 404.
- Les thèmes clair/sombre et les préférences de réduction sont lisibles.
- Le site est testé sur un véritable iPhone Safari et un appareil Android Chrome.

## Critères avant impression des cartes

- Le nom du dépôt et l'URL GitHub Pages sont gelés.
- Les scores et règles sont approuvés, notamment orange `+3`.
- Les 31 QR sont décodés automatiquement depuis le PDF final.
- Chaque QR ouvre l'ID attendu et non l'ancien artefact Claude.
- Une planche test est imprimée à l'échelle prévue et rescannée.
- Les PDF v8 du dossier historique ne sont pas envoyés par erreur à l'imprimeur.
