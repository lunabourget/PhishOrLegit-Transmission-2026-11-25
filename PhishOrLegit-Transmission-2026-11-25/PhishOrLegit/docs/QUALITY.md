# Qualité, tests et critères d'acceptation

Dernière exécution complète : 25 novembre 2026.

## Résultat actuel

- Formatage Prettier : réussi.
- ESLint sans avertissement : réussi.
- TypeScript strict : réussi.
- Vitest : 25 tests réussis dans 10 fichiers.
- Build Next.js : réussi, 36 pages statiques générées.
- Export GitHub Pages : les 10 routes LINK ont été vérifiées sous le base path du dépôt.
- Playwright : les deux tests ciblés du parcours LINK passent sur Chromium iPhone ; la suite complète n'a pas été relancée.
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

## État de publication

- Le site est public sur `https://lunabourget.github.io/PhishOrLegit-Transmission-2026-11-25/`.
- Les QR définitifs sont gelés ; ne pas les régénérer sauf changement explicite de fonctionnement.

## Critères pour les prochaines mises à jour

- `pnpm check` passe avant publication ; exécuter les tests E2E pertinents aux changements.
- Le workflow GitHub Pages est vert après publication.
- Le scanner fonctionne sur HTTPS et la saisie manuelle reste disponible.
- Aucun lien simulé ne quitte l'application vers une destination dangereuse.
- Les médias locaux ne produisent pas d'erreur 404.
- Les thèmes clair/sombre et les préférences de réduction sont lisibles.
- Le site est testé sur un véritable iPhone Safari et un appareil Android Chrome.

## Critères avant impression ou mise à jour des cartes

- Réutiliser les QR définitifs existants ; ne pas les régénérer sauf changement explicite de fonctionnement.
- Les scores et règles sont approuvés, notamment orange `+3`.
- Décoder les QR depuis le PDF final et vérifier que chaque code ouvre l'ID attendu, et non l'ancien artefact Claude.
- Une planche test est imprimée à l'échelle prévue et rescannée.
- Les PDF v8 du dossier historique ne sont pas envoyés par erreur à l'imprimeur.
