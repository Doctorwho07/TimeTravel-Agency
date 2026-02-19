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
  CalendarPlus,
} from "lucide-react";
import { destinations, Destination } from "../data/destinations";

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

  // Nouveaux états
  const [activeDest, setActiveDest] = useState<Destination>(destinations[0]);
  const [isGlobalBooking, setIsGlobalBooking] = useState(false);
  const [departureDate, setDepartureDate] = useState("");

  // Configuration initiale selon comment on a ouvert la modale
  useEffect(() => {
    if (isOpen) {
      if (destination) {
        // Clic depuis une carte
        setActiveDest(destination);
        setView("details");
        setIsGlobalBooking(false);
      } else {
        // Clic depuis le Header ("Réserver" général)
        setActiveDest(destinations[0]); // Par défaut, la 1ère destination
        setView("booking"); // On va direct au formulaire
        setIsGlobalBooking(true);
      }
      setIsVideoLoading(true);
      setIsBooking(false);
      setDepartureDate("");
    }
  }, [isOpen, destination]);

  if (!isOpen) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setView("success");
    }, 2000);
  };

  // Génération du lien Google Calendar
  const getCalendarUrl = () => {
    if (!departureDate) return "#";
    // Convertir la date (ex: 2026-10-25 -> 20261025)
    const dateStr = departureDate.replace(/-/g, "");
    const text = encodeURIComponent(`Saut Temporel : ${activeDest.name}`);
    const details = encodeURIComponent(
      `Préparez-vous pour votre transfert temporel vers l'année ${activeDest.year} !\nN'oubliez pas vos équipements.`,
    );
    const dates = `${dateStr}T090000Z/${dateStr}T110000Z`; // Horaire fictif (9h-11h UTC)

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-amber-500/20 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-amber-400" />
        </button>

        {view === "booking" && !isGlobalBooking && (
          <button
            onClick={() => setView("details")}
            className="absolute top-4 left-4 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors flex items-center gap-2 px-4"
          >
            <ArrowLeft className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-bold">Retour</span>
          </button>
        )}

        {/* L'image ou vidéo réagit à 'activeDest' */}
        {view !== "success" && (
          <div className="relative h-48 md:h-64 overflow-hidden rounded-t-2xl bg-black flex-shrink-0">
            {activeDest.video ? (
              <video
                key={activeDest.id} // Clé pour forcer le rechargement si la source change
                src={activeDest.video}
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={() => setIsVideoLoading(false)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoLoading ? "opacity-0" : "opacity-100"}`}
              />
            ) : (
              <img
                src={activeDest.image}
                alt={activeDest.name}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-400">
                {activeDest.name}
              </h2>
            </div>
          </div>
        )}

        <div className="p-8 flex-1 overflow-y-auto">
          {/* VUE 1: DÉTAILS */}
          {view === "details" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-amber-500/30">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-gray-300 text-sm">
                    {activeDest.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-amber-500/30">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span className="text-gray-300 text-sm">
                    {activeDest.difficulty}
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {activeDest.fullDesc}
              </p>
              <button
                onClick={() => setView("booking")}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-4 rounded-full text-lg font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/50"
              >
                Réserver ce Voyage Temporel
              </button>
            </div>
          )}

          {/* VUE 2: FORMULAIRE */}
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
                  Préparez votre expédition temporelle.
                </p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-amber-400 text-sm font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Destination
                  </label>
                  {isGlobalBooking ? (
                    <select
                      value={activeDest.id}
                      onChange={(e) => {
                        const newDest = destinations.find(
                          (d) => d.id === e.target.value,
                        );
                        if (newDest) {
                          setActiveDest(newDest);
                          setIsVideoLoading(true); // Relance le loading si on change de dest avec vidéo
                        }
                      }}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-amber-500 focus:ring-1 outline-none transition-all cursor-pointer"
                    >
                      {destinations.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.year})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={`${activeDest.name} - ${activeDest.era}`}
                      disabled
                      className="w-full bg-gray-800/50 border border-amber-500/20 rounded-lg p-3 text-amber-200/50 cursor-not-allowed"
                    />
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-amber-400 text-sm font-semibold flex items-center gap-2">
                      <User className="w-4 h-4" /> Voyageur Principal
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Nom complet"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-amber-400 text-sm font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date de départ
                    </label>
                    <input
                      required
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-amber-400 text-sm font-semibold flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Options & Équipements
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <label className="flex items-center gap-3 p-3 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer hover:border-amber-500/50">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-amber-500"
                      />
                      <span className="text-gray-300 text-sm">
                        Vêtements d'époque
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer hover:border-amber-500/50">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-amber-500"
                      />
                      <span className="text-gray-300 text-sm">
                        Assurance Paradoxe
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isBooking}
                className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-4 rounded-full text-lg font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/50 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isBooking ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Initialisation
                    du vortex...
                  </>
                ) : (
                  "Confirmer le saut"
                )}
              </button>
            </form>
          )}

          {/* VUE 3: SUCCÈS & CALENDRIER */}
          {view === "success" && (
            <div className="text-center py-8 animate-in zoom-in duration-500 flex flex-col items-center justify-center h-full">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Voyage Confirmé !
              </h3>
              <p className="text-gray-300 mb-8 max-w-md">
                Vos coordonnées pour {activeDest.name} ({activeDest.year}) ont
                été synchronisées.
              </p>

              <div className="flex flex-col gap-4 w-full max-w-xs">
                {/* BOUTON GOOGLE AGENDA */}
                <a
                  href={getCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-100 text-gray-900 hover:bg-white px-6 py-3 rounded-full font-bold transition-all shadow-lg"
                >
                  <CalendarPlus className="w-5 h-5" />
                  Ajouter au Calendrier
                </a>

                <button
                  onClick={onClose}
                  className="bg-gray-800 text-white border border-gray-600 px-6 py-3 rounded-full hover:bg-gray-700 transition-all"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
