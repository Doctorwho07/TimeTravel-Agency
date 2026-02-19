import { Clock, Shield, Award } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Clock,
      title: 'Précision Temporelle',
      description: 'Nos moteurs de chronologie quantique garantissent une précision absolue au moment exact de l\'histoire que vous souhaitez visiter.'
    },
    {
      icon: Shield,
      title: 'Sécurité Garantie',
      description: 'Les boucliers temporels avancés et les protocoles de prévention des paradoxes vous protègent tout au long de votre voyage.'
    },
    {
      icon: Award,
      title: 'Guides Experts',
      description: 'Nos guides temporels certifiés sont des historiens, linguistes et spécialistes du voyage temporel avec des décennies d\'expérience.'
    }
  ];

  return (
    <section id="about" className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
            L'Agence de Voyage Temporel de Prestige
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Depuis 2087, nous sommes les leaders de confiance en tourisme temporel. Notre technologie
            de chronologie ultramoderne et notre expertise incomparable font de nous le seul choix
            pour les voyageurs du temps en quête d'expériences historiques authentiques.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all hover:transform hover:scale-105 shadow-xl"
            >
              <feature.icon className="w-12 h-12 text-amber-400 mb-4" />
              <h3 className="text-2xl font-bold text-amber-400 mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
