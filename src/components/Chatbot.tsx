import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

// On définit la structure d'un message
type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // L'historique des messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      text: "Bonjour! Je suis votre assistant temporel. Avez-vous des questions sur nos destinations, les tarifs, ou les risques de paradoxes ?",
    },
  ]);

  // Référence pour scroller automatiquement en bas
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // À chaque nouveau message ou changement d'état "isTyping", on descend
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Le "cerveau" de notre chatbot simulant une IA
  const getBotResponse = (text: string): string => {
    const lowerText = text.toLowerCase();

    if (
      lowerText.includes("prix") ||
      lowerText.includes("combien") ||
      lowerText.includes("tarif")
    ) {
      return "Nos tarifs varient selon l'époque et les fluctuations de l'espace-temps. Comptez environ 50 000 Crédits pour un aller-retour standard. Des facilités de paiement inter-dimensionnelles sont possibles !";
    }
    if (
      lowerText.includes("danger") ||
      lowerText.includes("paradoxe") ||
      lowerText.includes("sécurité")
    ) {
      return "La sécurité est primordiale. Nos boucliers quantiques vous protègent, et la Règle d'Or s'applique : ne croisez jamais votre propre chemin et évitez de tuer des insectes dans le passé !";
    }
    if (lowerText.includes("dinosaures") || lowerText.includes("crétacé")) {
      return "Ah, le Crétacé ! Prévoyez des vêtements très résistants. Attention, l'assurance annulation ne couvre pas les morsures de T-Rex.";
    }
    if (lowerText.includes("bonjour") || lowerText.includes("salut")) {
      return "Salutations temporelles ! Où aimeriez-vous voyager aujourd'hui (ou hier, ou demain) ?";
    }

    return "C'est une excellente question. Les flux temporels sont actuellement instables sur ce sujet. Souhaitez-vous que je contacte un agent humain du 21ème siècle pour vous répondre en détail ?";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Ajouter le message de l'utilisateur
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: inputValue.trim(),
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");

    // 2. Simuler le temps de réflexion du bot
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: getBotResponse(newUserMsg.text),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500); // Le bot met 1.5 secondes à "taper"
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-96 h-[500px] bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header du Chat */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex items-center justify-between shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="bg-black/20 p-2 rounded-full">
                <MessageCircle className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-black leading-tight">
                  Assistant Temporel
                </h3>
                <p className="text-xs text-black/70 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-900 animate-pulse"></span>
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

          {/* Zone des messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-amber-500 text-black rounded-2xl rounded-tr-sm font-medium"
                      : "bg-gray-800 text-gray-200 border border-amber-500/20 rounded-2xl rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Indicateur de frappe */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 border border-amber-500/20 rounded-2xl rounded-tl-sm p-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                  <span className="text-xs text-gray-400">
                    Analyse temporelle...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Formulaire d'envoi */}
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-gray-900 border-t border-amber-500/20"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 bg-gray-800 border border-amber-500/30 rounded-full px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 p-2.5 rounded-full transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-black flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bouton d'ouverture du chat */}
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
