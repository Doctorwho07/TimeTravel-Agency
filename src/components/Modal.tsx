import { useState, useEffect } from "react";
import {
  X,
  Clock,
  TrendingUp,
  CheckCircle,
  Loader2,
  Calendar,
  User,
  CreditCard,
  ArrowLeft,
  Users,
  Briefcase,
  MapPin,
} from "lucide-react";
import { Destination } from "../data/destinations";

interface ModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

type ViewState = "details" | "booking" | "success";

export default function Modal({ destination, isOpen, onClose }: ModalProps) {
  const [view, setView] = useState<ViewState>("details");
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  // Réinitialisation lors de l'ouverture
  useEffect(() => {
    if (isOpen) {
      setView("details");
      setIsVideoLoading(true);
      setIsBooking(false);
    }
  }, [isOpen, destination]);

  if (!isOpen || !destination) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    // Simulation d'une requête API (2 secondes)
    setTimeout(() => {
      setIsBooking(false);
      setView("success");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-amber-500/20 flex flex-col">
        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-amber-400" />
        </button>

        {/* Bouton Retour (si on est dans le formulaire) */}
        {view === "booking" && (
          <button
            onClick={() => setView("details")}
            className="absolute top-4 left-4 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors flex items-center gap-2 px-4"
          >
            <ArrowLeft className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-bold">Retour</span>
          </button>
        )}

        {/* --- HEADER VISUEL --- */}
        {view !== "success" && (
          <div className="relative h-48 md:h-64 overflow-hidden rounded-t-2xl bg-black flex-shrink-0">
            {destination.video ? (
              <video
                src={destination.video}
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={() => setIsVideoLoading(false)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoLoading ? "opacity-0" : "opacity-100"}`}
              />
            ) : (
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-400">
                {destination.name}
              </h2>
            </div>
          </div>
        )}

        {/* --- CONTENU --- */}
        <div className="p-8 flex-1 overflow-y-auto">
          {/* VUE 1: DÉTAILS DE LA DESTINATION */}
          {view === "details" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-amber-500/30">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-gray-300 text-sm">
                    {destination.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-amber-500/30">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span className="text-gray-300 text-sm">
                    {destination.difficulty}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {destination.fullDesc}
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-amber-400 mb-4">
                  Points Forts
                </h3>
                <ul className="space-y-3">
                  {destination.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setView("booking")}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-4 rounded-full text-lg font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/50 hover:shadow-amber-400/70 transform hover:scale-[1.02]"
              >
                Réserver ce Voyage Temporel
              </button>
            </div>
          )}

          {/* VUE 2: FORMULAIRE DE RÉSERVATION COMPLET */}
          {view === "booking" && (
            <form
              onSubmit={handleBookingSubmit}
              className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Paramétrage du saut
                </h3>
                <p className="text-gray-400 text-sm">
                  Préparez votre expédition pour {destination.year}.
                </p>
              </div>

              <div className="space-y-5">
                {/* Ligne 1 : Destination bloquée */}
                <div className="space-y-2">
                  <label className="text-amber-400 text-sm font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Coordonnées
                    Spatio-Temporelles
                  </label>
                  <input
                    type="text"
                    value={`${destination.name} - ${destination.era}`}
                    disabled
                    className="w-full bg-gray-800/50 border border-amber-500/20 rounded-lg p-3 text-amber-200/50 cursor-not-allowed"
                  />
                </div>

                {/* Ligne 2 : Utilisateur & ID */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-amber-400 text-sm font-semibold flex items-center gap-2">
                      <User className="w-4 h-4" /> Voyageur Principal
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Nom complet"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-amber-400 text-sm font-semibold flex items-center gap-2">
                      <CreditCard className="w-4 h-4" /> ID Temporel (Optionnel)
                    </label>
                    <input
                      type="text"
                      placeholder="XXXX-XXXX"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Ligne 3 : Date & Passagers */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-amber-400 text-sm font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date de départ (Timeline
                      actuelle)
                    </label>
                    <input
                      required
                      type="date"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-amber-400 text-sm font-semibold flex items-center gap-2">
                      <Users className="w-4 h-4" /> Nombre de voyageurs
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      max="10"
                      defaultValue="1"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Ligne 4 : Accessoires */}
                <div className="space-y-3">
                  <label className="text-amber-400 text-sm font-semibold flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Options & Équipements
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <label className="flex items-center gap-3 p-3 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer hover:border-amber-500/50 transition-colors">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-amber-500"
                      />
                      <span className="text-gray-300 text-sm">
                        Vêtements d'époque authentiques
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer hover:border-amber-500/50 transition-colors">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-amber-500"
                      />
                      <span className="text-gray-300 text-sm">
                        Traducteur Universel Neural
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer hover:border-amber-500/50 transition-colors">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-amber-500"
                      />
                      <span className="text-gray-300 text-sm">
                        Assurance Paradoxe Temporel
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer hover:border-amber-500/50 transition-colors">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-amber-500"
                      />
                      <span className="text-gray-300 text-sm">
                        Vaccins anachroniques
                      </span>
                    </label>
                  </div>
                </div>

                <div className="bg-amber-900/20 border border-amber-500/20 p-4 rounded-lg mt-4">
                  <p className="text-amber-200 text-xs italic">
                    ⚠ Avertissement : En cliquant sur confirmer, vous acceptez
                    les règles de non-interférence historique et dégagez
                    l'agence de toute responsabilité en cas de modification
                    accidentelle de la timeline.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isBooking}
                className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-4 rounded-full text-lg font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/50 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isBooking ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Initialisation du vortex...
                  </>
                ) : (
                  "Confirmer le saut"
                )}
              </button>
            </form>
          )}

          {/* VUE 3: SUCCÈS */}
          {view === "success" && (
            <div className="text-center py-12 animate-in zoom-in duration-500 flex flex-col items-center justify-center h-full">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Voyage Confirmé !
              </h3>
              <p className="text-gray-300 mb-8 max-w-md">
                Vos coordonnées ont été envoyées au module de transfert.
                Préparez vos bagages, nous venons vous chercher hier.
              </p>
              <button
                onClick={onClose}
                className="bg-gray-800 text-white border border-gray-600 px-8 py-3 rounded-full hover:bg-gray-700 transition-all shadow-lg"
              >
                Retour à l'accueil
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
