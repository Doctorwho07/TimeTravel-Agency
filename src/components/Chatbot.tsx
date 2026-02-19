import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  CalendarPlus,
  MapPin,
} from "lucide-react";
import { destinations } from "../data/destinations"; // Assurez-vous du chemin

// Types pour structurer nos messages et choix
type Option = { label: string; value: string };

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  options?: Option[]; // S'il y a des boutons à afficher
  isCalendarLink?: boolean; // Si c'est le message de succès avec le calendrier
};

// Les différentes étapes de la réservation
type BookingStep =
  | "idle"
  | "destination"
  | "name"
  | "date"
  | "passengers"
  | "options"
  | "confirm";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // État de la réservation
  const [bookingStep, setBookingStep] = useState<BookingStep>("idle");
  const [bookingData, setBookingData] = useState<Record<string, string>>({});

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      text: 'Bonjour ! Je suis votre Agent Temporel. Dites "Réserver" pour commencer une réservation, ou posez-moi vos questions !',
      options: [{ label: "🚀 Démarrer une réservation", value: "reserver" }],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  // Génération du lien Google Calendar
  const getCalendarUrl = () => {
    if (!bookingData.date || !bookingData.destinationId) return "#";
    const dest = destinations.find((d) => d.id === bookingData.destinationId);
    const dateStr = bookingData.date.replace(/-/g, "");
    const text = encodeURIComponent(`Saut Temporel : ${dest?.name}`);
    const details = encodeURIComponent(
      `Voyageur: ${bookingData.name}\nPassagers: ${bookingData.passengers}\nPréparez-vous pour le transfert vers ${dest?.year} !`,
    );
    const dates = `${dateStr}T090000Z/${dateStr}T110000Z`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}`;
  };

  // Ajoute un message du bot avec un petit délai
  const botReply = (
    text: string,
    options?: Option[],
    isCalendarLink?: boolean,
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "bot",
          text,
          options,
          isCalendarLink,
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  // Machine à états : Gère la logique de la conversation
  const processInput = (userInput: string, rawValue?: string) => {
    // 1. Ajout du message utilisateur
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", text: userInput },
    ]);
    setInputValue("");

    const textLower = userInput.toLowerCase();
    const value = rawValue || userInput;

    // Si on n'est pas en train de réserver
    if (bookingStep === "idle") {
      if (
        textLower.includes("réserver") ||
        textLower.includes("reserver") ||
        value === "reserver"
      ) {
        setBookingStep("destination");
        const destOptions = destinations.map((d) => ({
          label: `${d.name} (${d.year})`,
          value: d.id,
        }));
        botReply(
          "Excellent choix ! Vers quelle époque souhaitez-vous voyager ?",
          destOptions,
        );
      } else if (textLower.includes("prix")) {
        botReply(
          "Nos tarifs varient. Dites 'Réserver' pour simuler un voyage !",
        );
      } else {
        botReply(
          "Je suis spécialisé dans les réservations. Dites 'Réserver' pour commencer ou posez une question sur nos voyages.",
        );
      }
      return;
    }

    // Si on est dans le processus de réservation
    switch (bookingStep) {
      case "destination":
        setBookingData((prev) => ({ ...prev, destinationId: value }));
        setBookingStep("name");
        botReply(
          "C'est noté ! À quel nom dois-je enregistrer ce saut temporel ?",
        );
        break;

      case "name":
        setBookingData((prev) => ({ ...prev, name: value }));
        setBookingStep("date");
        botReply(
          `Enchanté ${value}. À quelle date (de notre époque) souhaitez-vous partir ?`,
        );
        break;

      case "date":
        setBookingData((prev) => ({ ...prev, date: value }));
        setBookingStep("passengers");
        botReply(
          "Parfait. Combien de personnes voyagent avec vous ? (Entrez un nombre)",
        );
        break;

      case "passengers":
        setBookingData((prev) => ({ ...prev, passengers: value }));
        setBookingStep("options");
        botReply(
          "Avez-vous besoin de notre 'Pack Survie' (Vêtements d'époque + Assurance Paradoxe) ?",
          [
            { label: "Oui, Pack complet", value: "pack_oui" },
            { label: "Non, je gère", value: "pack_non" },
          ],
        );
        break;

      case "options":
        setBookingData((prev) => ({ ...prev, pack: value }));
        setBookingStep("confirm");
        const dest = destinations.find(
          (d) => d.id === bookingData.destinationId,
        );
        botReply(
          `Récapitulatif :\n- Destination: ${dest?.name}\n- Voyageur: ${bookingData.name}\n- Départ: ${bookingData.date}\n- Passagers: ${bookingData.passengers}\n\nConfirmez-vous ce saut ?`,
          [
            { label: "✅ Confirmer le saut", value: "confirm_yes" },
            { label: "❌ Annuler", value: "confirm_no" },
          ],
        );
        break;

      case "confirm":
        if (value === "confirm_yes") {
          setBookingStep("idle");
          setBookingData({}); // Reset
          botReply(
            "Félicitations ! Votre vortex est en cours de préparation. N'oubliez pas d'ajouter la date à votre agenda !",
            undefined,
            true,
          );
        } else {
          setBookingStep("idle");
          setBookingData({});
          botReply(
            "Réservation annulée. Dites 'Réserver' si vous changez d'avis !",
          );
        }
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    processInput(inputValue.trim());
  };

  // Détermine si on doit cacher l'input text (quand on attend un clic sur un bouton)
  const isInputDisabled =
    bookingStep === "destination" ||
    bookingStep === "options" ||
    bookingStep === "confirm";

  // Détermine le type d'input selon l'étape
  const inputType =
    bookingStep === "date"
      ? "date"
      : bookingStep === "passengers"
        ? "number"
        : "text";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-96 h-[550px] bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex items-center justify-between shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="bg-black/20 p-2 rounded-full">
                <MessageCircle className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-black leading-tight">
                  Agent Temporel
                </h3>
                <p className="text-xs text-black/70 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-900 animate-pulse"></span>{" "}
                  En ligne
                </p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="hover:bg-black/20 p-1.5 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                {/* Bulle de texte */}
                <div
                  className={`max-w-[85%] p-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-amber-500 text-black rounded-2xl rounded-tr-sm font-medium"
                      : "bg-gray-800 text-gray-200 border border-amber-500/20 rounded-2xl rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Boutons d'options (uniquement pour le bot) */}
                {msg.options && (
                  <div className="flex flex-col gap-2 mt-2 w-[85%]">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => processInput(opt.label, opt.value)}
                        disabled={
                          isTyping ||
                          (bookingStep === "idle" &&
                            msg.id !== messages[messages.length - 1].id)
                        } // Désactive les vieux boutons
                        className="text-left px-4 py-2 text-sm bg-gray-900 border border-amber-500/30 rounded-xl text-amber-400 hover:bg-amber-500/10 hover:border-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Bouton Calendrier */}
                {msg.isCalendarLink && (
                  <div className="mt-3 w-[85%]">
                    <a
                      href={getCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-4 py-3 rounded-xl font-bold transition-all shadow-lg hover:from-amber-400 hover:to-amber-500"
                    >
                      <CalendarPlus className="w-4 h-4" />
                      Ajouter à l'Agenda
                    </a>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 border border-amber-500/20 rounded-2xl rounded-tl-sm p-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                  <span className="text-xs text-gray-400">Transmission...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 bg-gray-900 border-t border-amber-500/20"
          >
            {isInputDisabled ? (
              <div className="text-center text-gray-500 text-sm py-2 italic flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" /> Veuillez choisir une option
                ci-dessus
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type={inputType}
                  value={inputValue}
                  min={inputType === "number" ? "1" : undefined}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={inputType === "date" ? "" : "Votre réponse..."}
                  className="flex-1 bg-gray-800 border border-amber-500/30 rounded-lg px-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-amber-500 transition-all [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 p-2.5 rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-black flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      <button
        onClick={toggleChat}
        className={`bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 p-4 rounded-full shadow-2xl shadow-amber-500/50 hover:shadow-amber-400/70 transition-all transform ${!isOpen && "hover:scale-110"}`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <MessageCircle className="w-6 h-6 text-black" />
        )}
      </button>
    </div>
  );
}
