import { useState } from "react";
import { MapPin, ArrowRight, Play } from "lucide-react"; // Ajout de l'icône Play
import { destinations, Destination } from "../data/destinations";
import Modal from "./Modal";

export default function Destinations() {
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDestination(null), 300);
  };

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
            <div
              key={destination.id}
              className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-500/50 transition-all hover:transform hover:scale-105 shadow-xl cursor-pointer"
              onClick={() => openModal(destination)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay vidéo si disponible */}
                {destination.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <div className="bg-amber-400/90 p-3 rounded-full text-black shadow-lg">
                      <Play className="fill-current w-6 h-6" />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full">
                  <span className="text-amber-400 text-sm font-semibold">
                    {destination.year}
                  </span>
                </div>
              </div>

              <div className="p-6">
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
          ))}
        </div>
      </div>

      <Modal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
