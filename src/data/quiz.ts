export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    value: string;
  }[];
}

export interface QuizResult {
  destination: string;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Quel type d\'expérience vous attire le plus?',
    options: [
      { text: 'Sophistication culturelle et élégance artistique', value: 'paris' },
      { text: 'Nature brute et aventure primale', value: 'cretaceous' },
      { text: 'Génie artistique et découverte intellectuelle', value: 'florence' }
    ]
  },
  {
    id: 2,
    question: 'Quel est votre niveau d\'aventure?',
    options: [
      { text: 'Je préfère le confort raffiné et l\'élégance', value: 'paris' },
      { text: 'Je recherche des sensations fortes et du danger', value: 'cretaceous' },
      { text: 'J\'aime la découverte avec un défi modéré', value: 'florence' }
    ]
  },
  {
    id: 3,
    question: 'Qu\'est-ce qui vous intéresse le plus?',
    options: [
      { text: 'L\'innovation moderne et le glamour social', value: 'paris' },
      { text: 'L\'histoire naturelle et la vie préhistorique', value: 'cretaceous' },
      { text: 'L\'art, l\'architecture et la créativité humaine', value: 'florence' }
    ]
  },
  {
    id: 4,
    question: 'Quel type d\'atmosphère préférez-vous?',
    options: [
      { text: 'Élégance urbaine sophistiquée', value: 'paris' },
      { text: 'Wilderness sauvage et indomptée', value: 'cretaceous' },
      { text: 'Charme historique et richesse culturelle', value: 'florence' }
    ]
  }
];

export const quizResults: Record<string, QuizResult> = {
  paris: {
    destination: 'Paris 1889',
    explanation: 'Votre goût raffiné et votre appréciation de l\'élégance culturelle vous rendent parfait pour la Belle Époque parisienne. Expérimentez le glamour de l\'inauguration de la Tour Eiffel et plongez dans la naissance de l\'art et la culture modernes.'
  },
  cretaceous: {
    destination: 'Époque Crétacée',
    explanation: 'Votre esprit aventurier et votre amour de la nature brute font de l\'Époque Crétacée le choix idéal pour vous. Témoignez des magnifiques dinosaures dans leur habitat naturel et expérimentez la Terre telle qu\'elle était il y a 65 millions d\'années.'
  },
  florence: {
    destination: 'Florence 1504',
    explanation: 'Votre passion pour l\'art et la découverte intellectuelle rend la Florence Renaissance parfaite pour vous. Rencontrez des maîtres légendaires comme Léonard et Michel-Ange, et témoignez de l\'une des plus grandes périodes créatives de l\'humanité.'
  }
};
