import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useUser } from "../Context/UserContext";
import { ShoppingCart, Menu, X, LogOut } from "lucide-react";
import SloganIcon from "@/Components/Icons/SloganIcon";
import { Button } from "@/Components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // ✅ Calculer le nombre d'articles
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Gérer la déconnexion
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-12">
          {/* 🏠 Logo et nom */}
          <Link to="/home" className="flex items-center gap-2">
            <SloganIcon />
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-gray-900">RestoGest</h1>
              <p className="text-[9px] text-gray-500">
                Gestion professionnelle
              </p>
            </div>
          </Link>

          {/* 🔗 Menu desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/suppliers"
              className="text-xs text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Fournisseurs
            </Link>
            <Link
              to="/home"
              className="text-xs text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Accueil
            </Link>
          </div>

          {/* 🛒 Panier + Utilisateur */}
          <div className="flex items-center gap-2">
            {/* 🛒 Icône panier */}
            <Link
              to="/cart"
              className="relative p-1.5 hover:bg-gray-100 rounded-md transition"
            >
              <ShoppingCart size={20} className="text-blue-600" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* 👤 Utilisateur connecté ou boutons auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-[9px] text-gray-500">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 hover:bg-red-100 text-red-600 rounded-md transition"
                  title="Déconnexion"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex gap-1">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                >
                  <Link to="/login">Se connecter</Link>
                </Button>
                <Button asChild size="sm" className="h-7 px-2 text-xs">
                  <Link to="/register">S'inscrire</Link>
                </Button>
              </div>
            )}

            {/* 📱 Menu mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 hover:bg-gray-100 rounded-md"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* 📱 Menu mobile ouvert */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            <Link
              to="/suppliers"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Fournisseurs
            </Link>
            <Link
              to="/home"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Accueil
            </Link>
            {!user && (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  S'inscrire
                </Link>
              </>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded text-left"
              >
                Déconnexion
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
