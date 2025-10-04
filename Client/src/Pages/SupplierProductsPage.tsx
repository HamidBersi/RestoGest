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

const SupplierProductsPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:4000/api/mock-suppliers/${id}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Chargement des produits...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Produits du fournisseur</h2>
      {products.length === 0 ? (
        <p>Aucun produit trouvé pour ce fournisseur.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
