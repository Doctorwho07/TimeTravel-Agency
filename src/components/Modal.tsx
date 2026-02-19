import { X, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { Destination } from "../data/destinations";

interface ModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ destination, isOpen, onClose }: ModalProps) {
  if (!isOpen || !destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-amber-500/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-amber-400" />
        </button>

        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl bg-black">
          {destination.video ? (
            <video
              src={destination.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">
              {destination.name}
            </h2>
            <p className="text-xl text-gray-300">{destination.era}</p>
          </div>
        </div>

        <div className="p-8">
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
            <h3 className="text-2xl font-bold text-amber-400 mb-4">
              Points Forts de l'Expérience
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

          <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-4 rounded-full text-lg font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/50 hover:shadow-amber-400/70 transform hover:scale-105">
            Parlez avec l'agent
          </button>
        </div>
      </div>
    </div>
  );
}
