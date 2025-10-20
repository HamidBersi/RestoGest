import { Link } from "react-router-dom";

export type Order = {
  id: string;
  supplier?: string;
  items: number;
  total: number;
  status?: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  date?: string;
};

const statusColor = (s?: Order["status"]) =>
  s === "confirmed"
    ? "bg-green-100 text-green-800"
    : s === "shipped"
    ? "bg-blue-100 text-blue-800"
    : s === "delivered"
    ? "bg-indigo-100 text-indigo-800"
    : s === "cancelled"
    ? "bg-red-100 text-red-800"
    : "bg-yellow-100 text-yellow-800";

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <article className="border rounded-lg p-3 w-72 hover:shadow-md transition-colors bg-white">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="text-sm font-semibold">
            {order.supplier ?? "Fournisseur inconnu"}
          </h3>
          <p className="text-xs text-gray-500">{order.date ?? "—"}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${statusColor(
            order.status
          )}`}
        >
          {order.status ?? "pending"}
        </span>
      </div>

      <div className="mt-2 text-sm">
        <p className="text-xs text-gray-600">
          Articles: <span className="font-medium">{order.items}</span>
        </p>
        <p className="text-xs text-gray-600">
          Total: <span className="font-medium">{order.total.toFixed(2)} €</span>
        </p>
      </div>

      <div className="mt-3">
        <Link
          to={`/orders/${order.id}`}
          className="block w-full text-center text-xs bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
        >
          Voir la commande
        </Link>
      </div>
    </article>
  );
};

export default OrderCard;
