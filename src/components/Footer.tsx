import { Clock, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-amber-500/20 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-amber-400" />
              <span className="text-xl font-bold text-amber-400">Agence Voyage Temporel</span>
            </div>
            <p className="text-gray-400 text-sm">
              Votre portail vers les plus grands moments de l'histoire.
            </p>
          </div>

          <div>
            <h4 className="text-amber-400 font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Accueil</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">À propos</a></li>
              <li><a href="#destinations" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Destinations</a></li>
              <li><a href="#quiz" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Quiz</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-amber-400 font-semibold mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Conditions d'Utilisation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Politique de Confidentialité</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Responsabilité Temporelle</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-amber-400 font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>info@voyagetemporel.agence</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>+33 (1) TEMPS-VOYAGE</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Siège Temporel, 2087</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-500/20 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2087 Agence Voyage Temporel. Tous droits réservés à travers tous les timelines.
          </p>
        </div>
      </div>
    </footer>
  );
}
