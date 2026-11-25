# Déploiement GitHub Pages et QR finaux

## Décision

Le projet de cours utilise GitHub Pages sans domaine personnalisé. Aucun compte serveur, base de données ou hébergement payant n'est nécessaire.

## URL attendue

Pour un dépôt nommé `PhishOrLegit` appartenant à `UTILISATEUR` :

```text
https://UTILISATEUR.github.io/PhishOrLegit/
```

Le nom du dépôt n'est pas codé en dur. `next.config.ts` lit `GITHUB_REPOSITORY` pendant GitHub Actions et applique automatiquement le bon `basePath`. Un dépôt spécial nommé `UTILISATEUR.github.io` reste servi à la racine.

## Première publication

1. Créer un dépôt GitHub vide, idéalement nommé `PhishOrLegit`.
2. Depuis le dossier du projet, ajouter tous les fichiers puis créer le premier commit.
3. Ajouter le dépôt distant et pousser la branche `main`.
4. Sur GitHub, ouvrir **Settings → Pages**.
5. Dans **Build and deployment**, choisir **Source: GitHub Actions**.
6. Ouvrir l'onglet **Actions** et vérifier le workflow `Deploy Next.js site to GitHub Pages`.
7. Attendre la réussite des jobs `build` et `deploy`, puis ouvrir l'URL publiée.

Exemple de commandes, à adapter avec l'URL réelle du dépôt :

```bash
git add .
git commit -m "Initial Phish or Legit application"
git remote add origin https://github.com/UTILISATEUR/PhishOrLegit.git
git push -u origin main
```

Le workflow `.github/workflows/deploy-pages.yml` installe Node.js et pnpm, exécute `pnpm check`, produit `out/`, envoie l'artefact puis déploie GitHub Pages.

## Vérification avant création des QR

Ne pas créer les QR définitifs tant que le nom du dépôt peut encore changer. Après publication :

1. ouvrir l'accueil sur iOS et Android ;
2. ouvrir directement au moins une route verte, orange, rouge et LINK ;
3. tester l'autorisation caméra du scanner ;
4. vérifier les thèmes clair et sombre ;
5. vérifier une URL avec le préfixe du dépôt ;
6. confirmer que le prochain changement de nom du dépôt est interdit ou accepté comme rupture des anciens QR.

## Format des QR finaux

Utiliser des chemins directs, pas des fragments ni l'ancien artefact Claude :

```text
https://UTILISATEUR.github.io/PhishOrLegit/scan/G-S1/
https://UTILISATEUR.github.io/PhishOrLegit/scan/O-S1/
https://UTILISATEUR.github.io/PhishOrLegit/scan/R-S1/
https://UTILISATEUR.github.io/PhishOrLegit/link/L01/
```

Générer 31 QR distincts : 21 Scan me et 10 LINK. Conserver un tableau de correspondance ID → URL → fichier QR. Après insertion dans les cartes, décoder chaque QR depuis le PDF final, puis imprimer une planche test à 100 % et rescanner sur au moins un iPhone et un appareil Android.

## Limites techniques

- GitHub Pages sert des fichiers statiques : ne pas ajouter une fonctionnalité exigeant un serveur Next.js sans revoir la stratégie d'hébergement.
- La caméra nécessite HTTPS, fourni par GitHub Pages, ou `localhost` en développement.
- Les chemins d'assets publics doivent passer par le mécanisme de base path existant lorsqu'ils sont référencés depuis le code.
- Le contenu ne doit pas dépendre d'une API secrète ou d'une variable d'environnement privée au runtime.

## Rollback

Une publication GitHub Pages correspond à un commit. En cas de problème, corriger sur `main` et pousser un nouveau commit ou redéployer un commit sain. Ne jamais modifier manuellement le contenu de `out/` : ce dossier est généré et ignoré par Git.
