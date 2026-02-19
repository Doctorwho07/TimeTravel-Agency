import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-96 h-[500px] bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/20 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-black" />
              <div>
                <h3 className="font-bold text-black">Assistant Temporel</h3>
                <p className="text-xs text-black/70">En ligne</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="hover:bg-black/10 p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="bg-gray-800 rounded-2xl rounded-tl-none p-4 mb-4 border border-amber-500/20">
              <p className="text-gray-300 text-sm">
                Bonjour! Je suis votre assistant temporel. Comment puis-je vous aider aujourd'hui?
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-amber-500/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Posez-moi vos questions sur les voyages temporels..."
                className="flex-1 bg-gray-800 border border-amber-500/20 rounded-full px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 p-3 rounded-full transition-all shadow-lg shadow-amber-500/30"
              >
                <Send className="w-5 h-5 text-black" />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={toggleChat}
        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 p-4 rounded-full shadow-2xl shadow-amber-500/50 hover:shadow-amber-400/70 transition-all transform hover:scale-110"
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
