# Prompt à donner au prochain ChatGPT

Copier le texte ci-dessous dans un nouveau chat après avoir joint l'archive complète du projet.

---

Tu reprends le développement du projet **Phish or Legit?**, compagnon mobile d'un jeu de plateau physique d'éducation au phishing.

Commence par décompresser le projet et lire intégralement, dans cet ordre :

1. `AGENTS.md`
2. `HANDOFF.md`
3. `docs/PRODUCT.md`
4. `docs/GAME-RULES.md`
5. `docs/CONTENT-STATUS.md`
6. `docs/ARCHITECTURE.md`
7. `docs/DESIGN-SYSTEM.md`
8. `docs/DEPLOYMENT.md`
9. `docs/QUALITY.md`
10. `docs/SOURCE-MATERIALS.md`
11. `docs/ROADMAP.md`

Respecte impérativement les points suivants :

- L'application complète le plateau physique ; elle ne gère ni les pions, ni la victoire, ni une partie numérique.
- L'interface utilisateur reste en anglais et la documentation peut rester en français.
- Les règles v9 et les décisions récentes ont priorité sur les anciens PDF et le classeur v8.
- Breach fait reculer tous les pions sauf celui qui déclenche la case.
- Une mauvaise réponse normale donne toujours zéro déplacement.
- Le déploiement cible GitHub Pages sans domaine personnalisé.
- Les QR finaux doivent pointer directement vers les routes `/scan/ID` et `/link/ID` du site GitHub Pages.
- Aucun scénario ne doit ouvrir une destination dangereuse ou collecter une donnée réelle.
- Préserve l'apparence iOS/Liquid Glass, l'accessibilité, les thèmes clair/sombre et les cibles tactiles de 44 px.
- Lis la documentation Next.js présente dans `node_modules/next/dist/docs/` avant de modifier les conventions Next.js, conformément à `AGENTS.md`.
- Exécute `pnpm check` et `pnpm test:e2e` après toute modification importante.
- Ne prétends pas qu'un élément est déployé, testé sur appareil réel ou intégré si ce n'est pas le cas.

État au 25 novembre 2026 : les 21 scénarios Scan me, le scanner QR et le workflow GitHub Pages sont réalisés. Les six fichiers audio M4A des appels sont intégrés. Les 10 cartes LINK n'ont que leurs routes/coquilles ; la parodie motion design, le quiz, le glossaire, les QR définitifs, les nouveaux fichiers d'impression et le déploiement public restent à faire.

Avant de coder, vérifie l'état du dépôt, lance les tests existants et résume ce que tu as compris. Ensuite, demande au porteur du projet quelle priorité il souhaite traiter, sauf si sa demande fournit déjà une tâche précise.

---
