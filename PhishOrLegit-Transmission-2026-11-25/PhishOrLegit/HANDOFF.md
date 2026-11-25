# Transmission complète — Phish or Legit?

Dernière mise à jour : 25 novembre 2026.

Ce document est le point d'entrée pour toute personne ou tout autre assistant IA qui reprend le projet. Il décrit l'état réel du produit, les décisions validées, les fichiers de référence, ce qui fonctionne et ce qu'il reste à produire.

## Résumé du projet

Phish or Legit? est le compagnon web mobile d'un jeu de plateau physique d'éducation au phishing. Le téléphone affiche des simulations contrôlées d'e-mails, de SMS et d'appels. Le plateau reste responsable des pions, des votes PHISH/LEGIT, des déplacements et de la victoire.

L'application est en anglais. La documentation de transmission est en français. Les marques, personnes, domaines et comptes affichés sont fictifs. L'application ne collecte aucune donnée personnelle et n'ouvre aucune destination dangereuse.

## État actuel en une phrase

La base technique, le design iOS/Liquid Glass, le scanner QR, les 21 expériences Scan me et le déploiement statique GitHub Pages sont réalisés et testés ; les 10 expériences LINK complètes, les médias définitifs, le quiz, le glossaire, les QR finaux et la publication restent à terminer.

## Réalisé

- Next.js 16 App Router, React 19, TypeScript strict, Node.js 24 et pnpm 10.
- Design mobile inspiré des conventions iOS 27 : thèmes clair/sombre, safe areas, réduction des animations et de la transparence, cibles tactiles de 44 px minimum.
- Écran d'accueil orienté scan avec logo officiel.
- Scanner QR dans l'application avec caméra arrière et saisie manuelle de secours.
- Validation des QR et prise en charge des routes directes ou des anciens fragments `#g-s1` / `#l01`.
- 21 routes Scan me entièrement branchées : sept vertes, sept orange et sept rouges.
- Moteurs réutilisables pour les simulations Mail, Messages et Voicemail.
- Vote physique PHISH/LEGIT, sélection d'indice, correction et conséquence de plateau.
- 10 routes LINK stables, encore limitées à leur coquille fonctionnelle.
- Règles v9 configurées et testées dans le domaine métier.
- Export statique compatible GitHub Pages, y compris lorsqu'il est servi sous `/<nom-du-depot>`.
- Workflow GitHub Actions prêt à publier automatiquement `main`.
- 24 tests unitaires et 58 tests Playwright sur Chromium iPhone et WebKit iPhone.
- Classeur v9 de 70 cartes rédigées disponible dans le paquet de transmission.
- Six scripts ElevenLabs prêts dans `docs/AUDIO-SCRIPTS.md`.

## Non réalisé ou à finaliser

1. Créer le dépôt GitHub, pousser le projet et activer GitHub Pages avec la source **GitHub Actions**.
2. Construire le vrai parcours des 10 cartes LINK : navigateur contrôlé, choix Click/Report, correction et conséquence.
3. Fournir et intégrer les six MP3 ElevenLabs sous `public/audio/`.
4. Fournir et intégrer la parodie motion design locale utilisée après certaines erreurs.
5. Ajouter le quiz final de cinq questions et le glossaire cybersécurité.
6. Décider si le dessin libre tactile est encore requis ; la sélection sémantique accessible fonctionne déjà.
7. Confirmer définitivement le score orange `+3`, actuellement l'unique valeur déduite.
8. Générer les QR finaux seulement après gel du nom du dépôt GitHub.
9. Régénérer les fichiers physiques v9 et tester chaque QR imprimé sur iOS et Android.
10. Effectuer une validation réelle sur iPhone/Safari et un audit d'accessibilité final.

## Règles validées

- 70 cartes : 20 vertes, 20 orange, 20 rouges et 10 LINK.
- Sept cartes Scan me par difficulté, soit 21 cartes interactives couleur.
- Bonne réponse : vert `+2`, orange `+3`, rouge `+4`.
- Mauvaise réponse normale : aucun déplacement, quelle que soit la difficulté.
- Mauvaise réponse Scan me : aucun déplacement et lecture de la parodie locale.
- Bonus Spot it : `+1`, sauf pour le joueur actuellement en tête.
- Les cartes rouges n'impriment pas de propositions d'indice.
- LINK phishing + Click : parodie puis recul de 3.
- LINK phishing + Report : avance de 2.
- LINK legit + Click : raccourci du plateau.
- LINK legit + Report : reste sur place.
- 2FA annule la prochaine erreur du joueur.
- Breach fait reculer tous les autres pions de 1, jamais le pion qui déclenche la case.
- Les cases spéciales s'activent uniquement après une avancée pendant son propre tour.
- Plateau : 25 cases, deux à six joueurs, environ 30 minutes.

La configuration exécutable se trouve dans `src/domain/game/rules.ts`. En cas de désaccord, ne pas coder une nouvelle règle dans un composant visuel : modifier la configuration et ses tests après validation de l'équipe.

## Structure à connaître

```text
.github/workflows/     Déploiement GitHub Pages
docs/                 Produit, règles, design, contenus, qualité et déploiement
e2e/                  Tests Playwright mobile Chromium/WebKit
public/               Logo et futurs médias locaux
src/app/              Routes Next.js et composition
src/components/       Composants iOS, layout et scanner
src/data/             Catalogues et contenu des scénarios
src/domain/           Validation, règles, scoring et routage QR
src/features/         Mail, Messages, Voicemail et correction
src/styles/           Tokens visuels et matériaux
```

## Fichiers à lire dans cet ordre

1. `HANDOFF.md` — présent résumé.
2. `docs/PRODUCT.md` — rôle du produit et limites.
3. `docs/GAME-RULES.md` — règles et arbitrages.
4. `docs/CONTENT-STATUS.md` — inventaire précis des routes et médias.
5. `docs/ARCHITECTURE.md` — organisation du code.
6. `docs/DESIGN-SYSTEM.md` — règles visuelles et d'accessibilité.
7. `docs/DEPLOYMENT.md` — GitHub Pages et QR finaux.
8. `docs/QUALITY.md` — tests et critères d'acceptation.
9. `docs/SOURCE-MATERIALS.md` — fichiers fournis et ordre d'autorité.
10. `docs/ROADMAP.md` — suite recommandée.

## Installation locale

Prérequis : Node.js 24, pnpm 10 et Git.

```bash
pnpm install
pnpm dev
```

Ouvrir `http://localhost:3000`. Le laboratoire de composants se trouve sur `/dev`.

Avant toute livraison :

```bash
pnpm check
pnpm test:e2e
```

## Déploiement prévu

Le projet doit utiliser GitHub Pages sans domaine personnalisé. Si le dépôt s'appelle `PhishOrLegit`, l'adresse attendue est :

```text
https://UTILISATEUR.github.io/PhishOrLegit/
```

Le code calcule automatiquement le préfixe à partir de `GITHUB_REPOSITORY`. Aucun nom d'utilisateur ni nom de dépôt n'est codé en dur. Les étapes exactes sont dans `docs/DEPLOYMENT.md`.

## État Git

Au moment de cette transmission, le projet est dans une branche locale `main`, sans dépôt distant et sans commit initial. Tous les fichiers appartiennent au projet et doivent être ajoutés au premier commit. Ne pas pousser `node_modules`, `.next`, `out`, les rapports de tests ou des secrets ; `.gitignore` les exclut déjà.

## Source de vérité

Ordre à appliquer lorsque deux fichiers se contredisent :

1. décision explicite la plus récente du porteur de projet ;
2. classeur `Phish or Legit - cards v9 (70 cards).xlsx` ;
3. `docs/GAME-RULES.md` et `src/domain/game/rules.ts` ;
4. concept doc ;
5. plateau v10 pour la géométrie et les couleurs ;
6. classeur v8 et PDF physiques, conservés uniquement comme prototypes historiques.

Toute contradiction doit être signalée et documentée, jamais résolue silencieusement.

## Contraintes de sécurité

- Ne jamais collecter de mot de passe, coordonnées bancaires ou messages réels.
- Ne jamais rediriger vers une URL dangereuse ou un vrai site de phishing.
- Conserver les interactions sensibles dans une simulation locale.
- Utiliser uniquement des voix fictives et des médias dont l'équipe possède les droits.
- Ne pas dépendre de YouTube, ElevenLabs, Claude ou d'un autre service externe au runtime.
