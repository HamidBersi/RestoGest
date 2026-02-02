import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type OrderItem = {
  id: number;
  product_id: number;
  unit_price: number;
  quantity: number;
  vat_rate?: number;
  Product?: {
    id: number;
    name: string;
    description?: string;
  };
};

type OrderDetails = {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  Supplier: {
    id: number;
    name: string;
    email?: string;
    phone?: string;
  };
  OrderItems: OrderItem[];
};

const statusColor = (status: string) => {
  const status_map: Record<string, string> = {
    draft: "bg-yellow-100 text-yellow-800",
    ordered: "bg-green-100 text-green-800",
    received: "bg-indigo-100 text-indigo-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return status_map[status] || "bg-gray-100 text-gray-800";
};

const statusLabel: Record<string, string> = {
  draft: "Brouillon",
  ordered: "Confirmée",
  received: "Livrée",
  cancelled: "Annulée",
};

const formatDateTime = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
};

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setError("ID de commande manquant");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    fetch(`http://127.0.0.1:4000/api/orders/${id}`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setOrder(data);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement:", err);
        setError("Impossible de charger la commande");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-6">Chargement de la commande…</div>;
  }

  if (error || !order) {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={18} />
          Retour aux commandes
        </button>
        <div className="text-red-600">{error || "Commande non trouvée"}</div>
      </main>
    );
  }

  const subtotal = order.OrderItems.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0,
  );
  const totalVAT = order.OrderItems.reduce((sum, item) => {
    const vat_rate = item.vat_rate || 0.2;
    return sum + item.unit_price * item.quantity * vat_rate;
  }, 0);
  const total = subtotal + totalVAT;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/orders")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={18} />
        Retour aux commandes
      </button>

      {/* En-tête */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">Commande #{order.id}</h1>
            <p className="text-gray-600">{formatDateTime(order.createdAt)}</p>
          </div>
          <span
            className={`text-sm px-4 py-2 rounded-full font-medium ${statusColor(
              order.status,
            )}`}
          >
            {statusLabel[order.status] || order.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase">Fournisseur</p>
            <p className="text-lg font-semibold">{order.Supplier.name}</p>
            {order.Supplier.email && (
              <p className="text-sm text-gray-600">{order.Supplier.email}</p>
            )}
            {order.Supplier.phone && (
              <p className="text-sm text-gray-600">{order.Supplier.phone}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase">Total</p>
            <p className="text-2xl font-bold text-green-600">
              {total.toFixed(2)} €
            </p>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="bg-white rounded-lg border overflow-hidden mb-6">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="font-semibold">Articles</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3">Produit</th>
              <th className="text-right px-6 py-3">Prix unitaire</th>
              <th className="text-center px-6 py-3">Quantité</th>
              <th className="text-right px-6 py-3">Sous-total</th>
            </tr>
          </thead>
          <tbody>
            {order.OrderItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">
                      {item.Product?.name || "Produit"}
                    </p>
                    {item.Product?.description && (
                      <p className="text-xs text-gray-500">
                        {item.Product.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="text-right px-6 py-4">
                  {item.unit_price.toFixed(2)} €
                </td>
                <td className="text-center px-6 py-4">{item.quantity}</td>
                <td className="text-right px-6 py-4 font-semibold">
                  {(item.unit_price * item.quantity).toFixed(2)} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Résumé des prix */}
      <div className="bg-white rounded-lg border p-6 max-w-md ml-auto">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Sous-total</span>
            <span>{subtotal.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>TVA</span>
            <span>{totalVAT.toFixed(2)} €</span>
          </div>
          <div className="border-t pt-3 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-green-600">{total.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetailsPage;
