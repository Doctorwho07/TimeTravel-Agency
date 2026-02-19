DRONIX
dronix38
Invisible

Coach Carter — 09/01/2026 11:32
jamais
Dionisoss — 09/01/2026 11:32
Oui
Coach Carter — 09/01/2026 11:36
stress pas, avec nael on gére la partie jira
DRONIX — 09/01/2026 11:38
la semaine de merde
Dionisoss — 09/01/2026 11:38
Le cours de merde \*
Coach Carter — 09/01/2026 11:39
Image
blackmail
10 € ou je balance le screen dans teams
Dionisoss — 09/01/2026 11:39
100 E pour ma part
Du coup
Elle fais quoi clara dans la vie ?
Coach Carter — 09/01/2026 11:40
il name drop
DRONIX — 09/01/2026 11:40
cest qui clara ?
Dionisoss — 09/01/2026 11:40
Bah ta meuf
DRONIX — 09/01/2026 11:40
t'as trouvé ca ou ?
Dionisoss — 09/01/2026 11:40
Tqt
DRONIX — 09/01/2026 11:41
bah faut verifier tes sources
Coach Carter — 09/01/2026 11:41
Dionisoss — 09/01/2026 11:41
J’ai décidé elle s’appel clara
DRONIX — 09/01/2026 11:41
tu as de mauvaises sources
Dionisoss — 09/01/2026 11:41
C’est toi qui cuisine ?
Coach Carter — 09/01/2026 11:41
DRONIX — 09/01/2026 11:42
on demande 5min pour l'oral
Coach Carter — 09/01/2026 12:01
@DRONIX ta donnée le lien du jira ??
Coach Carter — 09/01/2026 12:11
il casse le crane
DRONIX — 09/01/2026 12:12
Oui
Coach Carter — 09/01/2026 14:06
mdr @DRONIX va le cogner, il te parle trop mal
DRONIX — 09/01/2026 14:14
au hasard mdr
Coach Carter — 09/01/2026 16:06
@DRONIX bourreau des cœurs ❤️
Dionisoss — 09/01/2026 16:07
🤣🤣🤣
DRONIX
a commencé un appel. — 11:40
DRONIX — 11:40
on se fait le truc de l'ia
?
Coach Carter — 11:43
https://timetravel-agency-re-jfrs.bolt.host/
Image
Type de fichier joint : archive
project-bolt-sb1-d5lwhpwt.zip
4.01 MB
Coach Carter — 11:59
TimeTravel Agency — Webapp Interactive

Webapp interactive pour une agence de voyage temporel fictive.
Projet réalisé dans un cadre pédagogique, avec une approche orientée MVP, design immersif et personnalisation utilisateur.

Description

message.txt
6 Ko
DRONIX — 12:04
time-travel-agency-iota.vercel.app

﻿
TimeTravel Agency — Webapp Interactive

Webapp interactive pour une agence de voyage temporel fictive.
Projet réalisé dans un cadre pédagogique, avec une approche orientée MVP, design immersif et personnalisation utilisateur.

Description

TimeTravel Agency propose une expérience web moderne permettant aux utilisateurs de découvrir et comparer trois destinations temporelles emblématiques, puis d’obtenir une recommandation personnalisée selon leurs préférences.

La webapp met l’accent sur :

une interface immersive et premium,

la mise en valeur de destinations historiques,

une logique de personnalisation simple et transparente,

une navigation fluide et responsive.

Destinations proposées

Paris 1889 — Belle Époque, Exposition Universelle, Tour Eiffel

Crétacé (-65 millions d’années) — dinosaures, nature préhistorique

Florence 1504 — Renaissance italienne, art et architecture

Les visuels utilisés proviennent du projet TimeTravel Agency précédent.

Stack technique

Frontend : React

Styling : Tailwind CSS

Architecture : Single Page Application

Hébergement : Vercel (gratuit)

Gestion du code : GitHub

Fonctionnalités implémentées

Landing page immersive

Hero section

Présentation de l’agence

Navigation par ancres

Galerie des destinations

Cards interactives pour chaque époque

Modales avec informations détaillées

Intégration des visuels du projet initial

Système de recommandation personnalisé

Quiz interactif de 4 questions

Logique de scoring transparente

Destination recommandée avec explication

Interaction entre le quiz et l’interface globale

Design responsive

Mobile-first

Compatibilité desktop et mobile

Fonctionnalité de personnalisation (automation)

Un quiz de recommandation permet de suggérer automatiquement la destination la plus adaptée à l’utilisateur.

Principe :

4 questions à choix multiples

Chaque réponse incrémente un score pour une destination

La destination ayant le score le plus élevé est recommandée

Une explication contextualisée est affichée à l’utilisateur

Cette fonctionnalité répond à l’exigence d’automatisation/personnalisation du projet.

Outils et modèles IA utilisés
IA de génération de code

Outil de vibe coding :

Bolt.new (StackBlitz)
ou équivalent (v0.dev / Cursor selon itérations)

Modèle IA utilisé pour la génération et l’itération du code :

Claude Sonnet (via outil de vibe coding)

Modèle orienté développement web et composants React

L’IA a été utilisée comme assistant de développement pour :

générer la structure initiale de la webapp,

proposer une architecture de composants React,

accélérer l’implémentation du design et de la logique du quiz,

améliorer la lisibilité et la maintenabilité du code.

Aucune API IA payante n’est utilisée dans l’application finale.

Prompts utilisés (transparence)
Prompt de génération initiale
Build a modern React + Tailwind single-page webapp called “TimeTravel Agency”.

Requirements:

- Dark theme with gold accents, premium luxury style.
- Sections: Header (anchors), Hero, Agency intro, Destinations (3 interactive cards), Quiz, Footer.
- Destinations must be: Paris 1889, Cretaceous -65M, Florence 1504.
- Each destination card opens a modal with detailed information.
- Implement a quiz with 4 questions to recommend the best destination.
- Keep everything client-side.
- Clean and readable component structure.

Prompt pour la logique du quiz de recommandation
Refactor the destination quiz to use a transparent scoring system.

- Maintain a score for each destination.
- Each answer increments exactly one destination score.
- Recommend the destination with the highest score.
- Display a short explanation based on the user’s answers.
- Keep the logic simple, readable, and fully client-side.

Prompt pour l’intégration des assets
Integrate local images for each destination into the destination cards and modals.
Ensure responsive behavior and lazy loading.
Keep aspect ratios consistent and use object-cover where relevant.

Prompt d’amélioration UX / responsive
Improve the overall UX:

- Mobile-first layout
- Clear spacing and typography
- Subtle hover effects on destination cards
- Smooth scrolling between sections

Installation locale

Cloner le dépôt :

git clone <url-du-repo>

Installer les dépendances :

npm install

Lancer le projet en local :

npm run dev

Déploiement

La webapp est déployée sur Vercel.

URL publique :
👉 à compléter avec l’URL fournie par Vercel

Le site a été testé sur :

navigateur desktop

navigateur mobile

Crédits

Visuels : projet TimeTravel Agency (session précédente)

Technologies : React, Tailwind CSS

Hébergement : Vercel

Assistance au développement : IA de génération de code (usage pédagogique)

Licence

Projet pédagogique réalisé dans le cadre d’un enseignement universitaire.
Aucune utilisation commerciale.

Membres du groupe

Nom Prénom

Nom Prénom

Nom Prénom

Nom Prénom
message.txt
6 Ko
