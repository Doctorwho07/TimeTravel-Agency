import { Scale, Shield, AlertTriangle } from "lucide-react";

export default function Legal() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
            Mentions Légales & Temporelles
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Veuillez lire attentivement ces documents avant d'entrer dans le
            vortex. Applicables dans toutes les timelines connues et inconnues
            depuis 2087.
          </p>
        </div>

        <div className="space-y-12" id="Conditions">
          {/* SECTION 1 : CONDITIONS D'UTILISATION */}
          <div className="bg-gray-800/50 border border-amber-500/20 rounded-2xl p-8 md:p-12 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6 border-b border-amber-500/20 pb-4">
              <Scale className="w-8 h-8 text-amber-400" />
              <h3 className="text-3xl font-bold text-amber-400">
                Conditions Générales d'Utilisation
              </h3>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong>1. Acceptation des conditions :</strong> En utilisant
                les services de l'Agence Voyage Temporel, vous acceptez d'être
                lié par ces conditions dans le passé, le présent et le futur.
              </p>
              <p>
                <strong>2. Éligibilité :</strong> Les voyageurs doivent être
                âgés d'au moins 18 ans chronologiques. L'âge biologique peut
                varier selon les effets de la dilatation temporelle.
              </p>
              <p>
                <strong>3. Code de conduite inter-époques :</strong> Il est
                strictement interdit de :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>
                  Voler, modifier ou déplacer des artefacts historiques majeurs.
                </li>
                <li>
                  Utiliser des connaissances futures pour parier sur des
                  événements sportifs ou boursiers (Loi dite "Biff Tannen").
                </li>
                <li>
                  Interagir de manière prolongée avec des figures historiques
                  clés sans l'accord préalable du Bureau des Affaires
                  Temporelles.
                </li>
              </ul>
              <p>
                <strong>4. Résiliation :</strong> L'Agence se réserve le droit
                d'effacer votre existence de la ligne du temps principale en cas
                de violation grave de ces règles.
              </p>
            </div>
          </div>

          {/* SECTION 2 : POLITIQUE DE CONFIDENTIALITÉ */}
          <div
            className="bg-gray-800/50 border border-amber-500/20 rounded-2xl p-8 md:p-12 shadow-xl backdrop-blur-sm"
            id="Politique"
          >
            <div className="flex items-center gap-4 mb-6 border-b border-amber-500/20 pb-4">
              <Shield className="w-8 h-8 text-amber-400" />
              <h3 className="text-3xl font-bold text-amber-400">
                Politique de Confidentialité
              </h3>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong>1. Collecte des données :</strong> Nous collectons votre
                signature génétique, votre empreinte chronologique et vos
                données biométriques pour garantir que vous ne rencontrerez pas
                une version passée ou future de vous-même.
              </p>
              <p>
                <strong>2. Utilisation de vos données :</strong> Vos
                informations sont utilisées exclusivement pour le calibrage du
                vortex et la prévention des paradoxes. Nous ne vendrons jamais
                vos données à des corporations de timelines alternatives.
              </p>
              <p>
                <strong>3. Stockage :</strong> Vos données personnelles sont
                stockées dans une boucle causale fermée, située en dehors de
                l'espace-temps conventionnel, garantissant une sécurité absolue
                contre les cyber-attaques de pirates temporels.
              </p>
              <p>
                <strong>4. Droit à l'oubli :</strong> Vous pouvez demander la
                suppression de vos données. Cependant, cela pourrait entraîner
                une amnésie rétrograde vous faisant oublier que vous avez un
                jour voyagé avec nous.
              </p>
            </div>
          </div>

          {/* SECTION 3 : RESPONSABILITÉ TEMPORELLE */}
          <div
            className="bg-gray-800/50 border border-red-500/20 rounded-2xl p-8 md:p-12 shadow-xl backdrop-blur-sm"
            id="Responsabilité"
          >
            <div className="flex items-center gap-4 mb-6 border-b border-red-500/20 pb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <h3 className="text-3xl font-bold text-red-400">
                Clause de Responsabilité Temporelle
              </h3>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-red-300 italic mb-4">
                Avertissement légal obligatoire dicté par le Conseil de Sécurité
                Multiversel de 2087.
              </p>
              <p>
                <strong>1. L'Effet Papillon :</strong> L'Agence décline toute
                responsabilité si, par inadvertance, vous écrasez un insecte au
                Crétacé et qu'à votre retour, l'humanité a été remplacée par des
                reptiles humanoïdes intelligents. Aucun remboursement ne sera
                effectué dans ce cas de figure.
              </p>
              <p>
                <strong>2. Clause de Non-Interférence Familiale :</strong>{" "}
                L'Agence n'est pas responsable si vous devenez accidentellement
                votre propre grand-père ou grand-mère. Les frais de thérapie
                post-paradoxe sont à la charge exclusive du voyageur.
              </p>
              <p>
                <strong>3. Anachronismes :</strong> L'oubli d'un smartphone,
                d'une montre connectée ou d'une bouteille en plastique dans une
                époque antérieure à sa création entraînera une amende de 5 000
                000 de Crédits Universels et l'obligation de retourner nettoyer
                la timeline en mode "agent d'entretien".
              </p>
              <p>
                <strong>4. Implosion de l'Univers :</strong> En cas de
                destruction totale de la trame de l'univers due à vos actions,
                l'Agence se réserve le droit de poursuivre vos héritiers dans un
                univers parallèle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
