import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type OrderItem = {
  id: number;
  product_id: number;
  unit_price: number | string;
  quantity: number | string;
  vat_rate?: number | string;
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
    return (
      <main className="p-6 min-h-screen bg-white">
        <div className="p-6">Chargement de la commande…</div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="p-6 max-w-4xl mx-auto min-h-screen bg-white">
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
    (sum, item) => sum + Number(item.unit_price) * Number(item.quantity),
    0,
  );
  const totalVAT = order.OrderItems.reduce((sum, item) => {
    const vat_rate = Number(item.vat_rate) || 0.2;
    return sum + Number(item.unit_price) * Number(item.quantity) * vat_rate;
  }, 0);
  const total = subtotal + totalVAT;

  return (
    <main className="p-4 max-w-4xl mx-auto min-h-screen bg-white">
      <button
        onClick={() => navigate("/orders")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft size={16} />
        Retour aux commandes
      </button>

      {/* En-tête */}
      <div className="bg-white rounded-lg border p-3 mb-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-lg font-bold">Commande #{order.id}</h1>
            <p className="text-gray-600 text-xs">
              {formatDateTime(order.createdAt)}
            </p>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor(
              order.status,
            )}`}
          >
            {statusLabel[order.status] || order.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] text-gray-500 uppercase">Fournisseur</p>
            <p className="text-base font-semibold">{order.Supplier.name}</p>
            {order.Supplier.email && (
              <p className="text-xs text-gray-600">{order.Supplier.email}</p>
            )}
            {order.Supplier.phone && (
              <p className="text-xs text-gray-600">{order.Supplier.phone}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase">Total</p>
            <p className="text-xl font-bold text-green-600">
              {total.toFixed(2)} €
            </p>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="bg-white rounded-lg border overflow-hidden mb-4">
        <div className="px-4 py-2 border-b bg-gray-50">
          <h2 className="font-semibold text-sm">Articles</h2>
        </div>

        <table className="w-full text-xs">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-2">Produit</th>
              <th className="text-right px-4 py-2">Prix unitaire</th>
              <th className="text-center px-4 py-2">Quantité</th>
              <th className="text-right px-4 py-2">Sous-total</th>
            </tr>
          </thead>
          <tbody>
            {order.OrderItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <div>
                    <p className="font-medium text-xs">
                      {item.Product?.name || "Produit"}
                    </p>
                    {item.Product?.description && (
                      <p className="text-[10px] text-gray-500">
                        {item.Product.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="text-right px-4 py-2">
                  {Number(item.unit_price).toFixed(2)} €
                </td>
                <td className="text-center px-4 py-2">{item.quantity}</td>
                <td className="text-right px-4 py-2 font-semibold">
                  {(Number(item.unit_price) * Number(item.quantity)).toFixed(2)}{" "}
                  €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Résumé des prix */}
      <div className="bg-white rounded-lg border p-4 max-w-sm ml-auto">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Sous-total</span>
            <span>{Number(subtotal).toFixed(2)} €</span>
          </div>
          <div className="flex justify-between text-gray-600 text-xs">
            <span>TVA</span>
            <span>{Number(totalVAT).toFixed(2)} €</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-green-600">{Number(total).toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetailsPage;
