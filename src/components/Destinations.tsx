import { useState, useRef } from "react";
import { MapPin, ArrowRight, Play, Loader2 } from "lucide-react";
import { destinations, Destination } from "../data/destinations";

const DestinationCard = ({
  destination,
  onClick,
}: {
  destination: Destination;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-500/50 transition-all hover:transform hover:scale-105 shadow-xl cursor-pointer"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-64 overflow-hidden bg-black flex items-center justify-center">
        {destination.video && isHovered && isVideoLoading && (
          <div className="absolute z-20">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          </div>
        )}
        {destination.video && (
          <video
            ref={videoRef}
            src={destination.video}
            muted
            loop
            playsInline
            onWaiting={() => setIsVideoLoading(true)}
            onCanPlay={() => setIsVideoLoading(false)}
            className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700 ${isHovered && !isVideoLoading ? "opacity-100" : "opacity-0"}`}
          />
        )}
        <img
          src={destination.image}
          alt={destination.name}
          className={`w-full h-full object-cover transition-transform duration-500 relative z-0 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20 pointer-events-none" />

        {destination.video && (
          <div
            className={`absolute top-4 left-4 z-30 bg-black/60 p-2 rounded-full backdrop-blur-sm transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}
          >
            <Play className="w-4 h-4 text-amber-400" />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full z-30">
          <span className="text-amber-400 text-sm font-semibold">
            {destination.year}
          </span>
        </div>
      </div>

      <div className="p-6 relative z-30 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
          <h3 className="text-2xl font-bold text-amber-400">
            {destination.name}
          </h3>
        </div>
        <p className="text-gray-300 mb-4 leading-relaxed">
          {destination.shortDesc}
        </p>
        <div className="flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-3 transition-all">
          <span>Découvrir le Voyage</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default function Destinations({
  onOpenModal,
}: {
  onOpenModal: (dest: Destination) => void;
}) {
  return (
    <section
      id="destinations"
      className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
            Destinations Vedettes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explorez notre sélection soigneusement choisie de destinations
            temporelles.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onClick={() => onOpenModal(destination)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
