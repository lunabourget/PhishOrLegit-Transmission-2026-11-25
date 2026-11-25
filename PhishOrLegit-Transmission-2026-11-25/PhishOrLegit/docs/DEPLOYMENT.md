# Déploiement GitHub Pages et QR finaux

## Décision

Le projet de cours utilise GitHub Pages sans domaine personnalisé. Aucun compte serveur, base de données ou hébergement payant n'est nécessaire.

## URL publique actuelle

Le site est publié à l'adresse suivante :

```text
https://lunabourget.github.io/PhishOrLegit-Transmission-2026-11-25/
```

`next.config.ts` lit `GITHUB_REPOSITORY` pendant GitHub Actions et applique automatiquement le bon `basePath`.

## Publication des mises à jour

Le workflow `.github/workflows/deploy-pages.yml`, situé à la racine du dépôt, s'exécute lors des mises à jour de `main`. Il installe Node.js et pnpm, exécute `pnpm check` dans le dossier de l'application, produit `out/`, puis déploie GitHub Pages. Vérifier la réussite du workflow dans l'onglet **Actions** après chaque mise à jour.

## QR définitifs

Les 31 QR (21 Scan me et 10 LINK) sont définitifs et doivent pointer vers les routes directes suivantes, et non vers des fragments ou l'ancien artefact Claude :

```text
https://lunabourget.github.io/PhishOrLegit-Transmission-2026-11-25/scan/G-S1/
https://lunabourget.github.io/PhishOrLegit-Transmission-2026-11-25/scan/O-S1/
https://lunabourget.github.io/PhishOrLegit-Transmission-2026-11-25/scan/R-S1/
https://lunabourget.github.io/PhishOrLegit-Transmission-2026-11-25/link/L01/
```

Ne pas modifier ni régénérer les QR tant que le fonctionnement de l'application ne change pas. Si une évolution de fonctionnement est envisagée, vérifier avec la propriétaire du projet si elle rend les QR existants obsolètes avant de les remplacer. Pour les nouveaux fichiers de cartes, réutiliser les QR définitifs existants et vérifier les codes depuis le PDF final, puis sur une planche test.

## Limites techniques

- GitHub Pages sert des fichiers statiques : ne pas ajouter une fonctionnalité exigeant un serveur Next.js sans revoir la stratégie d'hébergement.
- La caméra nécessite HTTPS, fourni par GitHub Pages, ou `localhost` en développement.
- Les chemins d'assets publics doivent passer par le mécanisme de base path existant lorsqu'ils sont référencés depuis le code.
- Le contenu ne doit pas dépendre d'une API secrète ou d'une variable d'environnement privée au runtime.

## Rollback

Une publication GitHub Pages correspond à un commit. En cas de problème, corriger sur `main` et pousser un nouveau commit ou redéployer un commit sain. Ne jamais modifier manuellement le contenu de `out/` : ce dossier est généré et ignoré par Git.
