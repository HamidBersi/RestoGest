import { Button } from "@/Components/ui/button";
import { useUser } from "@/Context/UserContext";
import { useCart } from "@/Context/CartContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
  stock?: number;
  unit?: string;
  sku?: string;
  vat_rate?: number;
};

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { user } = useUser();
  const { addToCart, cart } = useCart(); // 🆕 Utiliser le cart
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1); // 🆕 État pour la quantité

  useEffect(() => {
    setError("");
    setProduct(null);

    if (!productId) {
      setError("Identifiant produit invalide.");
      return;
    }

    fetch(`http://127.0.0.1:4000/api/mock-suppliers/product/${productId}`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Produit introuvable");
        return res.json();
      })
      .then(setProduct)
      .catch((e) => setError(e.message));
  }, [productId, user]);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!product) return <div className="p-6">Chargement…</div>;

  // ✅ Vérifier si le produit est dans le panier
  const cartItem = cart.items.find((item) => item.productId === product.id);

  // ✅ Gérer l'ajout au panier
  const handleAddToCart = () => {
    if (!cart.supplierId) {
      // Si pas de supplierId, on doit le récupérer du produit
      // Pour l'instant, on utilise une valeur par défaut
      toast.error("Impossible de déterminer le fournisseur");
      return;
    }

    addToCart(
      {
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price || 0,
        quantity,
        vat_rate: product.vat_rate,
      },
      cart.supplierId,
    );

    toast.success(`${product.name} ajouté au panier !`);
    setQuantity(1); // Réinitialiser la quantité
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-xl shadow mt-10 bg-white">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded mb-4"
        />
      )}
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="mb-2">{product.description}</p>
      <p>
        <span className="font-semibold">Prix :</span> {product.price} €
      </p>
      <p>
        <span className="font-semibold">Catégorie :</span> {product.category}
      </p>
      <p>
        <span className="font-semibold">Stock :</span> {product.stock}{" "}
        {product.unit}
      </p>
      <p>
        <span className="font-semibold">SKU :</span> {product.sku}
      </p>
      <p>
        <span className="font-semibold">TVA :</span> {product.vat_rate} %
      </p>

      {/* 🆕 Badge si déjà dans le panier */}
      {cartItem && (
        <div className="mb-3 p-2 bg-green-100 text-green-700 rounded text-sm text-center">
          ✓ {cartItem.quantity} dans le panier
        </div>
      )}

      {/* 🆕 Bouton + Input quantité côte à côte */}
      <div className="mt-4 flex gap-2 items-center">
        <input
          type="number"
          min="1"
          max={product.stock || 999}
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, Number(e.target.value) || 1))
          }
          className="w-16 p-2 border rounded-md text-center text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:appearance-auto"
        />
        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
        >
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
