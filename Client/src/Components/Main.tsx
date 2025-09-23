import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import {
  ShoppingCart,
  ChartBar,
  Users,
  Truck,
  CheckCircle,
} from "lucide-react";
import FeatureCard from "./FeatureCard";
const Main = () => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
        <h2 className="text-2xl font-bold text-center">
          Gérez votre cuisine comme un{" "}
          <span className="text-blue-600 block text-center">Professionnel</span>
        </h2>
        <p className="mt-2 text-gray-600 text-xs">
          <span>RestoGest</span> votre assistant ultime pour optimiser la
          gestion de votre restaurant.
        </p>
        <div className="flex gap-4 mt-4">
          <Button asChild variant="default">
            <Link
              to="/login"
              className="text-white bg-black hover:bg-blue-600 text-xs"
            >
              J'ai déjà un compte
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/register" className="hover:bg-gray-100 text-xs">
              Commencer gratuitement
            </Link>
          </Button>
        </div>
        <h3 className="text-md font-bold mt-15 text-center">
          Tout ce dont vous avez besoin
        </h3>
        <p className="mt-2 text-gray-600 text-xs text-center max-w-md">
          Une solution complète pour gèrer efficacement votre restaurant, de la
          caommande à la l'analyse des performances.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-10 py-10 bg-gray-50">
        <FeatureCard
          icon={<ShoppingCart size={24} className="text-blue-600" />}
          title="Gestion des commandes"
          description="Suivez et gérez facilement les commandes de vos clients en temps réel."
          color="blue"
        />
        <FeatureCard
          icon={<Truck size={24} className="text-green-600" />}
          title="Fournisseurs"
          description="Organisez vos relations avec vos fournisseurs."
          color="green"
        />
        <FeatureCard
          icon={<ChartBar size={24} className="text-purple-600" />}
          title="Analyse des performances"
          description="Obtenez des rapports détaillés pour optimiser vos opérations."
        />
        <FeatureCard
          icon={<Users size={24} className="text-orange-600" />}
          title="Gestion du personnel"
          description="Organisez les horaires et les tâches de votre équipe efficacement."
        />
      </div>

      <div className="flex flex-col items-center justify-center p-10 bg-white">
        <h3 className="text-lg font-bold text-center">
          Pourquoi choisir RestoGest ?
        </h3>
        <p className="my-5 text-gray-600 text-xs max-w-md text-center">
          Conçu spécialement pour les professionnels de la restauration,
          RestoGestion simplifie la gestion quotidienne de votre cuisine.
        </p>
        <ul>
          <li className="mb-2 flex items-center text-xs gap-2">
            <CheckCircle size={16} className="text-green-600" /> Interface
            intuitive, moderne et facile à utiliser.
          </li>
          <li className="mb-2 flex items-center text-xs gap-2">
            <CheckCircle size={16} className="text-green-600" /> Gestion
            complète de votre cuisine
          </li>
          <li className="mb-2 flex items-center text-xs gap-2">
            <CheckCircle size={16} className="text-green-600" /> Suivi en temps
            réel.
          </li>
          <li className="mb-2 flex items-center text-xs gap-2">
            <CheckCircle size={16} className="text-green-600" /> Rapprt
            détaillés et analyses.
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Main;
