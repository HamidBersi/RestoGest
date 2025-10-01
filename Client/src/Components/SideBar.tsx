import {
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

  console.log("Sidebar user:", user);

  if (!user) return null;
  return (
    <aside className="flex flex-col h-screen w-50 border-r bg-blue-50">
      <div className="flex flex-col items-center py-8 border-b">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl mb-2">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-full h-full rounded-full"
            />
          ) : (
            <User size={32} />
          )}
        </div>
        <div className="font-semibold text-lg">{user.name}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
            {user.role}
          </span>
        </div>
        <div className="text-gray-500 text-sm mt-1">{user.email}</div>
      </div>

      <nav className="flex-1 px-6 py-4">
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              to="/orders"
              className="flex items-center gap-3 text-gray-700 text-sm hover:text-blue-600 cursor-pointer hover:bg-blue-100 rounded-lg px-3 py-2"
            >
              <ShoppingCart size={15} />
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
