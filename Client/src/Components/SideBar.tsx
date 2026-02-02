import {
  ClipboardList,
  ShoppingCart,
  Truck,
  Settings,
  Heart,
  LogOut,
  User,
} from "lucide-react";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";
const SideBar = () => {
  const { user } = useUser();
  if (!user) return null;
  return (
    <aside className="flex flex-col h-screen w-50 border-r bg-blue-50">
      <div className="flex flex-col items-center py-3 px-2 border-b gap-1">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-full h-full rounded-full"
            />
          ) : (
            <User size={20} />
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{user.name}</span>
          <span className="bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5 rounded">
            {user.role}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-6 py-4">
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              to="/orders"
              className="flex items-center gap-3 text-gray-700 text-sm hover:text-blue-600 cursor-pointer hover:bg-blue-100 rounded-lg px-3 py-2"
            >
              <ClipboardList size={15} />
              <span>Commandes</span>
            </Link>
          </li>
          <li>
            <Link
              to="/suppliers"
              className="flex items-center gap-3 text-gray-700 text-sm hover:text-blue-600 cursor-pointer hover:bg-blue-100 rounded-lg px-3 py-2"
            >
              <Truck size={15} />
              <span>Fournisseurs</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3 text-gray-700 text-sm hover:text-blue-600 cursor-pointer hover:bg-blue-100 rounded-lg px-3 py-2"
            >
              <Settings size={15} />
              <span>Paramètres</span>
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="flex items-center gap-3 text-gray-700 text-sm hover:text-blue-600 cursor-pointer hover:bg-blue-100 rounded-lg px-3 py-2"
            >
              <ShoppingCart size={15} />
              <span>Mon panier</span>
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className="flex items-center gap-3 text-gray-700 text-sm hover:text-blue-600 cursor-pointer hover:bg-blue-100 rounded-lg py-2 px-1 w-[99%]"
            >
              <Heart size={15} />
              <span>Mes favoris</span>
            </Link>
          </li>
        </ul>
      </nav>

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
