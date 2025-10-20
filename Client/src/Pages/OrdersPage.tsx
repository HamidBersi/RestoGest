import { useEffect, useState } from "react";
import OrderCard from "../Components/OrderCard";
import type { Order } from "../Components/OrderCard";

const mockOrders: Order[] = [
  {
    id: "O1",
    supplier: "Fournisseur A",
    items: 3,
    total: 45.5,
    status: "confirmed",
    date: "2025-10-10",
  },
  {
    id: "O2",
    supplier: "Fournisseur B",
    items: 7,
    total: 123.2,
    status: "shipped",
    date: "2025-10-12",
  },
  {
    id: "O3",
    supplier: "Fournisseur C",
    items: 1,
    total: 9.0,
    status: "pending",
    date: "2025-10-14",
  },
];

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("/api/orders")
      .then(async (res) => {
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        return res.json();
      })
      .then((data: Order[]) => setOrders(data))
      .catch(() => setOrders(mockOrders))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Chargement des commandes…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Commandes</h2>
      </header>

      {orders.length === 0 ? (
        <p>Aucune commande.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </div>
      )}
    </main>
  );
};

export default OrdersPage;
