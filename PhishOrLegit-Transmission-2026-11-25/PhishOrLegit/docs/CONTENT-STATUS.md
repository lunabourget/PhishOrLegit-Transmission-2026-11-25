# État des contenus et des routes

Dernière vérification : 25 novembre 2026.

## Inventaire physique v9

| Pile      |  Total | Cartes standard | Scan me / LINK |
| --------- | -----: | --------------: | -------------: |
| Verte     |     20 |              13 |      7 Scan me |
| Orange    |     20 |              13 |      7 Scan me |
| Rouge     |     20 |              13 |      7 Scan me |
| LINK      |     10 |               0 |        10 LINK |
| **Total** | **70** |          **39** |         **31** |

Le contenu complet des 70 cartes se trouve dans `Phish or Legit - cards v9 (70 cards).xlsx`, inclus dans le dossier `source-materials/current/` de l'archive de transmission.

## Routes Scan me implémentées

Toutes les routes ci-dessous ont une expérience interactive, une validation PHISH/LEGIT, une correction et une conséquence de plateau.

| ID   | Niveau | Canal  | Verdict | Sujet principal                                  |
| ---- | ------ | ------ | ------- | ------------------------------------------------ |
| G-S1 | vert   | e-mail | PHISH   | faux support StreamFlix sur Gmail                |
| G-S2 | vert   | SMS    | LEGIT   | notification FriendSpace                         |
| G-S3 | vert   | appel  | PHISH   | faux appel ParcelGo demandant une carte          |
| G-S4 | vert   | e-mail | PHISH   | faux cadeau ShopNow et domaine trompeur          |
| G-S5 | vert   | appel  | LEGIT   | information du secrétariat de l'école            |
| G-S6 | vert   | SMS    | PHISH   | faux lien de paiement scolaire                   |
| G-S7 | vert   | e-mail | LEGIT   | devoir noté sur domaine scolaire officiel        |
| O-S1 | orange | e-mail | PHISH   | faux domaine CloudBox                            |
| O-S2 | orange | e-mail | LEGIT   | information NovaBank sans action risquée         |
| O-S3 | orange | SMS    | PHISH   | lien ParcelGo visuellement proche                |
| O-S4 | orange | SMS    | PHISH   | faux lien de réinitialisation scolaire           |
| O-S5 | orange | appel  | PHISH   | faux conseiller bancaire demandant un code SMS   |
| O-S6 | orange | appel  | LEGIT   | information du service informatique scolaire     |
| O-S7 | orange | SMS    | PHISH   | faux remboursement EventTickets                  |
| R-S1 | rouge  | appel  | PHISH   | voix de manager et virement urgent               |
| R-S2 | rouge  | appel  | LEGIT   | rappel RH Brightwave                             |
| R-S3 | rouge  | e-mail | PHISH   | domaine caché derrière un bouton de paie         |
| R-S4 | rouge  | SMS    | PHISH   | faux fil NovaBank malgré un vrai domaine visible |
| R-S5 | rouge  | SMS    | PHISH   | demande de code 2FA CloudBox                     |
| R-S6 | rouge  | e-mail | PHISH   | pièce jointe `.pdf.html` déguisée                |
| R-S7 | rouge  | e-mail | LEGIT   | alerte de connexion avec instruction sûre        |

Chemins permanents : `/scan/G-S1` à `/scan/G-S7`, `/scan/O-S1` à `/scan/O-S7`, et `/scan/R-S1` à `/scan/R-S7`.

## Routes LINK

Les routes `/link/L01` à `/link/L10` existent, sont validées et sont pré-générées lors de l'export. Elles affichent encore une coquille de route : l'expérience de navigateur contrôlé, les choix Click/Report et les conséquences doivent être développés.

| ID  | Verdict attendu |
| --- | --------------- |
| L01 | LEGIT           |
| L02 | PHISH           |
| L03 | LEGIT           |
| L04 | PHISH           |
| L05 | LEGIT           |
| L06 | PHISH           |
| L07 | LEGIT           |
| L08 | PHISH           |
| L09 | LEGIT           |
| L10 | PHISH           |

## Scanner QR

L'accueil peut ouvrir la caméra arrière via `@zxing/browser`. Si la caméra est indisponible ou refusée, un champ accepte un identifiant tel que `G-S1` ou `L01`. Le résolveur accepte :

- un identifiant seul ;
- une route directe `/scan/G-S1` ou `/link/L01` ;
- une URL GitHub Pages contenant un préfixe de dépôt ;
- un ancien fragment `#g-s1` ou `#l01`.

Un code inconnu est refusé et ne provoque aucune navigation externe.

## Audio des appels

Les six fichiers M4A sont intégrés dans le projet :

```text
public/audio/g-s3.m4a
public/audio/g-s5.m4a
public/audio/o-s5.m4a
public/audio/o-s6.m4a
public/audio/r-s1.m4a
public/audio/r-s2.m4a
```

Les textes exacts, directions de voix et spécifications d'export sont dans `docs/AUDIO-SCRIPTS.md`. La transcription de chaque appel est repliée par défaut et peut être révélée comme indice.

## Autres médias à fournir

- Parodie motion design locale pour les mauvaises réponses Scan me et les clics sur un LINK phishing.
- Éventuels sons d'interface, uniquement s'ils sont possédés ou correctement licenciés.
- Aucun média ne doit être chargé depuis YouTube, ElevenLabs ou un autre service externe pendant la partie.

## Contenus encore absents de l'application

- Quiz final de cinq questions.
- Glossaire anglais des termes cybersécurité.
- Parcours complet des dix LINK.
- Page pédagogique complète regroupant définition, statistiques, méthodes d'identification et bonnes pratiques, si l'équipe souhaite l'afficher dans l'application.
- Import automatique du classeur v9 vers les données TypeScript.
