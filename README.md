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

- Landing page immersive  
  - Hero section  
  - Présentation de l’agence  
  - Navigation par ancres  

- Galerie des destinations  
  - Cards interactives pour chaque époque  
  - Modales avec informations détaillées  
  - Intégration des visuels du projet initial  

- Système de recommandation personnalisé  
  - Quiz interactif de 4 questions  
  - Logique de scoring transparente  
  - Destination recommandée avec explication  

- Design responsive  
  - Mobile-first  
  - Compatibilité desktop et mobile  

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

- Nom Prénom  
- Nom Prénom  
- Nom Prénom  
- Nom Prénom  

À renseigner également sur Moodle conformément aux consignes.
