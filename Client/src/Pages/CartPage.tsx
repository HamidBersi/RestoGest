import { useCart } from "@/Context/CartContext";
import { useUser } from "@/Context/UserContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { submitOrder } from "@/lib/cartApi";
import { toast } from "sonner";
import { useState } from "react";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } =
    useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Gérer la soumission de la commande
  const handleSubmitOrder = async () => {
    if (!user) {
      toast.error("Vous devez être connecté");
      navigate("/login");
      return;
    }

    if (!cart.supplierId) {
      toast.error("Aucun fournisseur sélectionné");
      return;
    }

    if (cart.items.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }

    setIsSubmitting(true);
    try {
      // Préparer les données pour l'API
      const payload = {
        products: cart.items.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
          vat_rate: item.vat_rate ?? 20,
        })),
        ordered_by_user_id: user.id,
        supplier_id: Number(cart.supplierId),
      };

      // Envoyer la commande
      const order = await submitOrder(payload);
      toast.success(`Commande créée avec succès ! #${order.id}`);

      // Vider le panier
      clearCart();

      // Rediriger vers une page de confirmation
      navigate("/orders");
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la création de la commande");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Panier vide
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <ShoppingCart size={48} className="text-gray-300 mb-3" />
        <h2 className="text-xl font-bold text-gray-700 mb-1">
          Votre panier est vide
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Ajoutez des produits pour commencer
        </p>
        <Button
          onClick={() => navigate("/suppliers")}
          className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-3 text-xs"
        >
          Voir les fournisseurs
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-3 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        {/* 🛒 Titre avec icône */}
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart size={24} className="text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">Mon Panier</h1>
        </div>

        {/* 📋 Tableau des articles */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-900">
                    Produit
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-900">
                    Prix unitaire
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-900">
                    Quantité
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-900">
                    Sous-total
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-bold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr
                    key={item.productId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {item.price.toFixed(2)} €
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-1.5">
                        {/* ➖ Bouton moins */}
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        >
                          <Minus size={14} />
                        </button>

                        {/* 📊 Quantité */}
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.productId,
                              parseInt(e.target.value) || 1,
                            )
                          }
                          className="w-12 p-1 border rounded text-center text-sm"
                        />

                        {/* ➕ Bouton plus */}
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold text-gray-900">
                      {(item.price * item.quantity).toFixed(2)} €
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 💰 Résumé de la commande */}
        <div className="bg-white rounded-md shadow-sm p-4 mb-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-700">
              <span>Sous-total :</span>
              <span>{getTotalPrice().toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Livraison :</span>
              <span>Gratuit</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-base font-bold text-gray-900">
              <span>Total :</span>
              <span className="text-blue-600">
                {getTotalPrice().toFixed(2)} €
              </span>
            </div>
          </div>
        </div>

        {/* 🔘 Boutons d'action */}
        <div className="flex gap-2 flex-col sm:flex-row">
          <Button
            onClick={() => navigate("/suppliers")}
            variant="outline"
            className="flex-1 h-8 text-xs"
          >
            Continuer les achats
          </Button>
          <Button
            onClick={handleSubmitOrder}
            disabled={isSubmitting}
            className="flex-1 h-8 bg-green-600 hover:bg-green-700 text-white text-xs"
          >
            {isSubmitting ? "Création en cours..." : "Valider la commande"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
