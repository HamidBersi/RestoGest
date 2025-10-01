import SloganIcon from "./Icons/SloganIcon"; // Ton composant d'icône
import { CalendarDays, Clock } from "lucide-react";

const HomeMain = () => {
  // Date et heure actuelles
  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-blue-100 rounded-full p-6 mb-2">
          <SloganIcon className="text-blue-600 w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Bienvenue dans votre espace cuisine
        </h1>
        <p className="text-gray-500 text-center text-sm">
          Gérez efficacement vos commandes, fournisseurs et favoris
        </p>
        <div className="bg-white rounded-xl shadow border mt-6 px-10 py-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <CalendarDays size={16} />
            <span>Aujourd&apos;hui</span>
          </div>
          <div className="font-semibold text-lg text-gray-900">{dateStr}</div>
          <div className="flex items-center gap-2 text-gray-500 mt-1">
            <Clock size={16} />
            <span>{timeStr}</span>
          </div>
        </div>
        <div className="mt-8 text-gray-400 text-sm text-center">
          Utilisez le menu à gauche pour naviguer dans l&apos;application
        </div>
      </div>
    </main>
  );
};

export default HomeMain;
