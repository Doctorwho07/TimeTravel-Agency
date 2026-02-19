import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  CalendarPlus,
  MapPin,
} from "lucide-react";
import { destinations } from "../data/destinations";

type Option = { label: string; value: string };

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  options?: Option[];
  isCalendarLink?: boolean;
};

// J'ai ajouté 'advisor_message' et 'advisor_contact'
type ChatStep =
  | "idle"
  | "destination"
  | "name"
  | "date"
  | "passengers"
  | "options"
  | "confirm"
  | "advisor_message"
  | "advisor_contact";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [chatStep, setChatStep] = useState<ChatStep>("idle");
  const [bookingData, setBookingData] = useState<Record<string, string>>({});

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      text: "Bonjour ! Je suis votre Agent Temporel. Que puis-je faire pour vous aujourd'hui ?",
      options: [
        { label: "🚀 Démarrer une réservation", value: "reserver" },
        { label: "👨‍💼 Parler à un conseiller", value: "conseiller" },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

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

  const processInput = (userInput: string, rawValue?: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", text: userInput },
    ]);
    setInputValue("");

    const textLower = userInput.toLowerCase();
    const value = rawValue || userInput;

    // --- ÉTAT DE REPOS (Menu principal) ---
    if (chatStep === "idle") {
      if (
        textLower.includes("réserver") ||
        textLower.includes("reserver") ||
        value === "reserver"
      ) {
        setChatStep("destination");
        const destOptions = destinations.map((d) => ({
          label: `${d.name} (${d.year})`,
          value: d.id,
        }));
        botReply(
          "Excellent choix ! Vers quelle époque souhaitez-vous voyager ?",
          destOptions,
        );
      }
      // NOUVEAU FLUX : Parler à un conseiller
      else if (
        textLower.includes("conseiller") ||
        textLower.includes("agent") ||
        textLower.includes("humain") ||
        value === "conseiller"
      ) {
        setChatStep("advisor_message");
        botReply(
          "Un conseiller temporel est à votre disposition. Veuillez rédiger votre message ou la question que vous souhaitez lui poser :",
        );
      } else if (textLower.includes("prix")) {
        botReply(
          "Nos tarifs varient. Dites 'Réserver' pour simuler un voyage !",
        );
      } else {
        botReply(
          "Je suis spécialisé dans les réservations. Que souhaitez-vous faire ?",
          [
            { label: "🚀 Démarrer une réservation", value: "reserver" },
            { label: "👨‍💼 Parler à un conseiller", value: "conseiller" },
          ],
        );
      }
      return;
    }

    // --- LOGIQUE DES ÉTAPES ---
    switch (chatStep) {
      // FLUX 1 : RÉSERVATION
      case "destination":
        setBookingData((prev) => ({ ...prev, destinationId: value }));
        setChatStep("name");
        botReply(
          "C'est noté ! À quel nom dois-je enregistrer ce saut temporel ?",
        );
        break;

      case "name":
        setBookingData((prev) => ({ ...prev, name: value }));
        setChatStep("date");
        botReply(
          `Enchanté ${value}. À quelle date (de notre époque) souhaitez-vous partir ?`,
        );
        break;

      case "date":
        setBookingData((prev) => ({ ...prev, date: value }));
        setChatStep("passengers");
        botReply(
          "Parfait. Combien de personnes voyagent avec vous ? (Entrez un nombre)",
        );
        break;

      case "passengers":
        setBookingData((prev) => ({ ...prev, passengers: value }));
        setChatStep("options");
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
        setChatStep("confirm");
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
          setChatStep("idle");
          setBookingData({});
          botReply(
            "Félicitations ! Votre vortex est en cours de préparation. N'oubliez pas d'ajouter la date à votre agenda !",
            undefined,
            true,
          );
        } else {
          setChatStep("idle");
          setBookingData({});
          botReply(
            "Réservation annulée. Dites 'Réserver' si vous changez d'avis !",
          );
        }
        break;

      // FLUX 2 : CONSEILLER
      case "advisor_message":
        // On pourrait sauvegarder le message de l'utilisateur ici, mais on passe directement à la suite.
        setChatStep("advisor_contact");
        botReply(
          "Un agent du Bureau Temporel vient de recevoir votre demande. Pour qu'il puisse vous recontacter, veuillez m'indiquer votre adresse e-mail ou votre numéro de téléphone :",
        );
        break;

      case "advisor_contact":
        setChatStep("idle");
        botReply(
          `C'est noté. Nos agents vous recontacteront très prochainement sur : ${value}. Y a-t-il autre chose que je puisse faire pour vous ?`,
          [{ label: "🚀 Démarrer une réservation", value: "reserver" }],
        );
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    processInput(inputValue.trim());
  };

  // Désactiver l'input texte si on force l'utilisateur à cliquer sur un bouton
  const isInputDisabled =
    chatStep === "destination" ||
    chatStep === "options" ||
    chatStep === "confirm";

  // Changer le type de clavier/input sur mobile
  const inputType =
    chatStep === "date"
      ? "date"
      : chatStep === "passengers"
        ? "number"
        : "text";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-96 h-[550px] bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
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

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/40 flex flex-col">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-amber-500 text-black rounded-2xl rounded-tr-sm font-medium"
                      : "bg-gray-800 text-gray-200 border border-amber-500/20 rounded-2xl rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.options && (
                  <div className="flex flex-col gap-2 mt-2 w-[85%]">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => processInput(opt.label, opt.value)}
                        // On désactive si ce n'est pas le dernier message ou si le bot "réfléchit"
                        disabled={
                          isTyping ||
                          (chatStep === "idle" &&
                            msg.id !== messages[messages.length - 1].id)
                        }
                        className="text-left px-4 py-2 text-sm bg-gray-900 border border-amber-500/30 rounded-xl text-amber-400 hover:bg-amber-500/10 hover:border-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

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

          {/* Input Form */}
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

      {/* Bouton de bascule */}
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
