// src/pages/SupplierProductsPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiCall } from "@/lib/api";
import ProductCard from "../Components/ProductCard";

type Product = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
};

function getNumericId(idParam?: string) {
  if (!idParam) return "";
  return idParam.match(/\d+/)?.[0] ?? "";
}

const SupplierProductsPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setError("");
    setProducts([]);
    setLoading(true);

    const numericId = getNumericId(id);
    if (!numericId) {
      setError("Identifiant fournisseur invalide.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    apiCall<Product[]>(`/mock-suppliers/mock/${numericId}/products`, {
      signal: controller.signal,
    })
      .then((data) => setProducts(data))
      .catch((e) => {
        if (e.name === "AbortError") return; // requête annulée lors d'un changement de page
        setError(e.message || "Erreur de chargement des produits");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  if (loading) return <div className="p-6">Chargement des produits...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Produits du fournisseur</h2>
      {products.length === 0 ? (
        <p>Aucun produit trouvé pour ce fournisseur.</p>
      ) : (
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          {products.map((p) => (
            <ProductCard
              key={p.id}
              name={p.name}
              description={p.description}
              price={p.price}
              image={p.image}
              id={p.id}
              supplierId={id || ""} // 🆕 Passer le supplierId
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierProductsPage;
