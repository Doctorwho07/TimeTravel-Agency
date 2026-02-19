# TimeTravel Agency — Webapp Interactive

Webapp interactive pour une agence de voyage temporel fictive.  
Projet réalisé dans un cadre pédagogique, avec une approche orientée MVP, design immersif et personnalisation utilisateur.

## Description

TimeTravel Agency propose une expérience web moderne permettant aux utilisateurs de découvrir et comparer trois destinations temporelles emblématiques, puis d’obtenir une recommandation personnalisée selon leurs préférences.

La webapp met l’accent sur :

- une interface immersive et premium,
- la mise en valeur de destinations historiques,
- une logique de personnalisation simple et transparente,
- une navigation fluide et responsive.

## Destinations proposées

- Paris 1889 — Belle Époque, Exposition Universelle, Tour Eiffel
- Crétacé (-65 millions d’années) — dinosaures, nature préhistorique
- Florence 1504 — Renaissance italienne, art et architecture

Les visuels utilisés proviennent du projet TimeTravel Agency précédent.

## Stack technique

- Frontend : React
- Styling : Tailwind CSS
- Architecture : Single Page Application
- Hébergement : Vercel (gratuit)
- Gestion du code : GitHub

## Fonctionnalités implémentées

- Système de Réservation Interactif (Multi-étapes)
  - Transformation de la modale d'information en un formulaire de réservation complet (State Machine).
  - Gestion du contexte : pré-sélection de la destination depuis une card, ou choix libre depuis le menu principal.
  - Formulaire dynamique (Nom, Date de départ, Nombre de passagers, Options d'équipements temporels).
  - Génération automatique d'un événement Google Agenda personnalisé à la confirmation du saut.

- Galerie des destinations enrichie
  - Remplacement dynamique de l'image par une vidéo de présentation au survol (hover) des cards.
  - Gestion des états de chargement asynchrones (spinners) pour une UX fluide lors du chargement des vidéos.

- Assistant Virtuel Temporel (Chatbot Avancé)
  - Simulation d'un agent conversationnel via une machine à états (State Machine) sans API externe.
  - Parcours utilisateur guidé avec des boutons d'options interactifs.
  - Possibilité d'effectuer une réservation complète directement depuis le chat.
  - Parcours alternatif "Parler à un conseiller humain" avec simulation de prise de contact.
  - Améliorations UX : indicateur de frappe (typing effect) et auto-scroll vers le dernier message.

- Section Légale Intégrée (Single Page)
  - Ajout d'une section de mentions légales immersives et humoristiques directement dans le flux de la page principale.
  - Thématisation complète : Conditions d'utilisation temporelles, Politique de confidentialité (protection contre les paradoxes) et Responsabilité (Effet Papillon).
  - Navigation fluide via ancres depuis le footer sans rechargement de page.

## Fonctionnalité de personnalisation (automation)

Un quiz de recommandation permet de suggérer automatiquement la destination la plus adaptée à l’utilisateur.

Principe :

- 4 questions à choix multiples
- Chaque réponse incrémente un score pour une destination
- La destination ayant le score le plus élevé est recommandée
- Une explication contextualisée est affichée à l’utilisateur

Cette fonctionnalité répond à l’exigence d’automatisation/personnalisation du projet.

## Outils et modèles IA utilisés

### IA de génération de code

- Outils de vibe coding utilisés :
  - Bolt.new (StackBlitz)
  - v0.dev (Vercel)
  - Cursor (selon itérations)

- Modèles IA utilisés :
  - Claude Sonnet (via outils de vibe coding)
  - Modèle spécialisé en génération de code front-end (React, Tailwind)

L’IA a été utilisée comme assistant de développement pour :

- générer la structure initiale de la webapp,
- proposer l’architecture des composants React,
- accélérer l’implémentation du design et de la logique du quiz,
- améliorer la lisibilité et la maintenabilité du code.

Aucune API IA payante n’est utilisée dans l’application finale.

## Prompts utilisés (transparence)

### Prompt de génération initiale

```
Build a modern React + Tailwind single-page webapp called “TimeTravel Agency”.

Requirements:
- Dark theme with gold accents, premium luxury style.
- Sections: Header (anchors), Hero, Agency intro, Destinations (3 interactive cards), Quiz, Footer.
- Destinations must be: Paris 1889, Cretaceous -65M, Florence 1504.
- Each destination card opens a modal with detailed information.
- Implement a quiz with 4 questions to recommend the best destination.
- Keep everything client-side.
- Clean and readable component structure.
```

### Prompt pour la logique du quiz de recommandation

```
Refactor the destination quiz to use a transparent scoring system.

- Maintain a score for each destination.
- Each answer increments exactly one destination score.
- Recommend the destination with the highest score.
- Display a short explanation based on the user’s answers.
- Keep the logic simple, readable, and fully client-side.
```

### Prompt pour l’intégration des assets

```
Integrate local images for each destination into the destination cards and modals.
Ensure responsive behavior and lazy loading.
Keep aspect ratios consistent and use object-cover where relevant.
```

### Prompt d’amélioration UX et responsive

```
Improve the overall UX:
- Mobile-first layout
- Clear spacing and typography
- Subtle hover effects on destination cards
- Smooth scrolling between sections
```

### Prompt pour l'enrichissement multimédia des cards

`Add a video preview feature to the destination cards. When the user hovers over a card, it should transition from the static image to an auto-playing, muted video. Add a loading spinner while the video buffers to ensure a good UX.`

### Prompt pour le système de réservation et Calendar

`Transform the current destination Modal into a multi-step booking process using React state (details -> booking form -> success). The form should include fields for Name, Date, Passengers, and Equipment checkboxes. Upon success, generate a dynamic Google Calendar link so the user can add their time travel trip to their agenda.`

### Prompt pour l'Agent Conversationnel (Chatbot)

`Upgrade the static Chatbot into an interactive booking agent using a State Machine in React. The bot should guide the user through booking a trip step-by-step using clickable option buttons and dynamic inputs. Add a typing indicator, auto-scroll to the bottom, and a secondary flow to "Talk to a human advisor". Keep it fully client-side.`

### Prompt pour le lore et les mentions légales

`Generate a complete React component for a Legal section (Terms of Use, Privacy Policy, Liability) to be integrated into the main landing page. Write the content in French, fully adapted to the "Time Travel Agency" theme, including humorous sci-fi references like the butterfly effect, grandfather paradox, and temporal shields. No modifications needed on my end.`

## Installation locale

1. Cloner le dépôt :

```
git clone <url-du-repo>
```

2. Installer les dépendances :

```
npm install
```

3. Lancer le projet en local :

```
npm run dev
```

## Déploiement

La webapp est déployée sur Vercel.

URL publique :  
à compléter avec l’URL fournie par Vercel

Le site a été testé sur :

- navigateur desktop
- navigateur mobile

## Crédits

- Visuels : projet TimeTravel Agency (session précédente)
- Technologies : React, Tailwind CSS
- Hébergement : Vercel
- Assistance au développement : IA de génération de code (usage pédagogique)

## Licence

Projet pédagogique réalisé dans le cadre d’un enseignement universitaire.  
Aucune utilisation commerciale.

## Membres du groupe

- MERLIN Sacha
- NAEL Mozer
- PEDRE Alexis
- ROUCHES Alexis
