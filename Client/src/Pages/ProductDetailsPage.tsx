import { Button } from "@/Components/ui/button";
import { useUser } from "@/Context/UserContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");

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
      <Button className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600">
        Ajouter au panier
      </Button>
    </div>
  );
};

export default ProductDetailsPage;
