// src/pages/SupplierProductsPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

    const url = `http://localhost:4000/api/mock-suppliers/mock/${numericId}/products`;

    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(
            `Erreur ${res.status} sur ${url}${text ? ` : ${text}` : ""}`
          );
        }
        return res.json();
      })
      .then((data: Product[]) => setProducts(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Chargement des produits...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Produits du fournisseur</h2>
      {products.length === 0 ? (
        <p>Aucun produit trouvé pour ce fournisseur.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              name={p.name}
              description={p.description}
              price={p.price}
              image={p.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierProductsPage;
