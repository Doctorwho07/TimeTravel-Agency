import { Clock } from 'lucide-react';

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-amber-500/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-amber-400" />
            <h1 className="text-2xl font-bold text-amber-400">Agence Voyage Temporel</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-300 hover:text-amber-400 transition-colors"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-amber-400 transition-colors"
            >
              À propos
            </button>
            <button
              onClick={() => scrollToSection('destinations')}
              className="text-gray-300 hover:text-amber-400 transition-colors"
            >
              Destinations
            </button>
            <button
              onClick={() => scrollToSection('quiz')}
              className="text-gray-300 hover:text-amber-400 transition-colors"
            >
              Quiz
            </button>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-2 rounded-full font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/30">
              Réserver
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
