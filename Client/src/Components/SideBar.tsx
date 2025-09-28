import {
  ShoppingCart,
  Truck,
  Settings,
  Heart,
  LogOut,
  User,
} from "lucide-react";

const SideBar = () => {
  return (
    <aside className="flex flex-col h-screen w-64 border-r bg-white">
      {/* Profil */}
      <div className="flex flex-col items-center py-8 border-b">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl mb-2">
          <User size={32} />
        </div>
        <div className="font-semibold text-lg">Chef Utilisateur</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
            Chef
          </span>
        </div>
        <div className="text-gray-500 text-sm mt-1">chef@restaurant.com</div>
      </div>

      <nav className="flex-1 px-6 py-4">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <ShoppingCart size={20} />
            <span>Commandes</span>
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <Truck size={20} />
            <span>Fournisseurs</span>
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <Settings size={20} />
            <span>Paramètres</span>
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <Heart size={20} />
            <span>Mes favoris</span>
          </li>
        </ul>
      </nav>

      {/* Déconnexion */}
      <div className="px-4 py-6">
        <button className="flex items-center gap-2 w-full border border-red-200 text-red-600 rounded-lg px-4 py-2 hover:bg-red-50 transition">
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
