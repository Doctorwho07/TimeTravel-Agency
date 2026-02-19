export interface Destination {
  id: string;
  name: string;
  year: string;
  era: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  duration: string;
  difficulty: string;
  category: 'historical' | 'ancient' | 'renaissance';
}

export const destinations: Destination[] = [
  {
    id: 'paris-1889',
    name: 'Paris 1889',
    year: '1889',
    era: 'Belle Époque',
    image: '/paris.jpg',
    shortDesc: 'Expérimentez l\'inauguration de la Tour Eiffel et l\'Exposition Universelle',
    fullDesc: 'Plongez dans l\'ère glamour de la Belle Époque et témoignez du dévoilement de la tour de fer controversée de Gustave Eiffel. Explorez l\'Exposition Universelle de 1889, assistez à des soirées exclusives avec l\'aristocratie parisienne et expérimentez la naissance des mouvements d\'art moderne à Montmartre.',
    highlights: [
      'Assistez à la cérémonie d\'inauguration de la Tour Eiffel',
      'Visitez les pavillons de l\'Exposition Universelle',
      'Expérimentez les performances authentiques du Moulin Rouge',
      'Rencontrez les artistes et intellectuels influents',
      'Goûtez la cuisine authentique de la Belle Époque'
    ],
    duration: '7 jours',
    difficulty: 'Facile',
    category: 'historical'
  },
  {
    id: 'cretaceous',
    name: 'Époque Crétacée',
    year: '-65 Millions d\'Années',
    era: 'Crétacé Tardif',
    image: '/cretace.jpg',
    shortDesc: 'Témoignez l\'ère des dinosaures dans leurs derniers jours avant l\'extinction',
    fullDesc: 'Voyagez 65 millions d\'années en arrière pour expérimenter le crépuscule des dinosaures. Observez des créatures magnifiques comme le Tyrannosaure Rex et le Tricératops dans leur habitat naturel. Nos protocoles de sécurité temporelle vous garantissent de témoigner ces géants préhistoriques depuis des postes d\'observation sécurisés.',
    highlights: [
      'Observez le Tyrannosaure Rex et le Tricératops en direct',
      'Explorez la flore et la faune préhistoriques',
      'Témoignez du paysage dramatique du Crétacé Tardif',
      'Étudiez les anciens écosystèmes à distance sûre',
      'Expérimentez l\'atmosphère terrestre d\'il y a 65 millions d\'années'
    ],
    duration: '3 jours',
    difficulty: 'Extrême',
    category: 'ancient'
  },
  {
    id: 'florence-1504',
    name: 'Florence 1504',
    year: '1504',
    era: 'Haute Renaissance',
    image: '/renaissance.jpeg',
    shortDesc: 'Témoignez Léonard de Vinci et Michel-Ange au sommet de leur génie',
    fullDesc: 'Visitez la Florence Renaissance durant l\'une des périodes artistiques les plus extraordinaires de l\'histoire. Témoignez de la rivalité entre Léonard de Vinci et Michel-Ange, voyez le dévoilement de David et immergez-vous dans la révolution artistique qui a changé la civilisation occidentale à jamais.',
    highlights: [
      'Rencontrez Léonard de Vinci et Michel-Ange',
      'Témoignez du dévoilement du David de Michel-Ange',
      'Explorez les ateliers et techniques de la Renaissance',
      'Assistez aux réunions du Palais Medici',
      'Expérimentez la cuisine et la culture authentiques de la Renaissance'
    ],
    duration: '5 jours',
    difficulty: 'Modéré',
    category: 'renaissance'
  }
];
