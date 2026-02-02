import { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  vat_rate?: number;
};

export type Cart = {
  supplierId: string | null;
  items: CartItem[];
};

type CartContextType = {
  cart: Cart;
  addToCart: (item: CartItem, supplierId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ supplierId: null, items: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error("Erreur parsing cart:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // ✅ Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // ✅ Ajouter un article au panier
  const addToCart = (item: CartItem, supplierId: string) => {
    // Vérifier que le panier est vide ou du même fournisseur
    if (cart.supplierId && cart.supplierId !== supplierId) {
      alert(
        "⚠️ Votre panier contient déjà des articles d'un autre fournisseur!",
      );
      return;
    }

    setCart((prev) => {
      const existing = prev.items.find((i) => i.productId === item.productId);

      if (existing) {
        // Si produit existe déjà, augmenter la quantité
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          ),
        };
      } else {
        // Sinon, ajouter le nouvel article
        return {
          supplierId,
          items: [...prev.items, item],
        };
      }
    });
  };

  // ✅ Retirer un article du panier
  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const newItems = prev.items.filter((i) => i.productId !== productId);
      return {
        supplierId: newItems.length === 0 ? null : prev.supplierId,
        items: newItems,
      };
    });
  };

  // ✅ Modifier la quantité
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i,
      ),
    }));
  };

  // ✅ Vider le panier
  const clearCart = () => {
    setCart({ supplierId: null, items: [] });
  };

  // ✅ Calculer le prix total
  const getTotalPrice = () => {
    return cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ✅ Hook pour utiliser le panier partout
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
