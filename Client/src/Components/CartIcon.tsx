import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const CartIcon = () => {
  const { cart } = useCart();

  // ✅ Calculer le nombre total d'articles dans le panier
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/cart" className="relative">
      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
        {/* 🛒 Icône du panier */}
        <ShoppingCart size={24} className="text-blue-600" />

        {/* 🔴 Badge avec le nombre d'articles */}
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}

        {/* 📝 Texte "Panier" */}
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
          Panier
        </span>
      </div>
    </Link>
  );
};

export default CartIcon;
