import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Destinations from "./components/Destinations";
import Quiz from "./components/Quiz";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Modal from "./components/Modal";
import { Destination } from "./data/destinations"; // Assurez-vous que le chemin est bon

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  // Ouvre la modale. Si dest est null, c'est une réservation générale (depuis le header)
  const openModal = (dest: Destination | null = null) => {
    setSelectedDestination(dest);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* On passe la fonction au Header */}
      <Header onBookClick={() => openModal(null)} />

      <Hero />
      <About />

      {/* On passe la fonction aux Destinations */}
      <Destinations onOpenModal={openModal} />

      <Quiz />
      <Footer />
      <Chatbot />

      {/* La Modale est maintenant gérée globalement */}
      <Modal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
