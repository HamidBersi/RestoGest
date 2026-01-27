import { useEffect, useState } from "react";
import SupplierCard from "../Components/SupplierCard";

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<
    Array<{ id: number; name: string; contact: string }>
  >([]);

  useEffect(() => {
    fetch("http://127.0.0.1:4000/api/mock-suppliers/mock", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSuppliers(data || []))
      .catch((err) => console.error("Failed to fetch suppliers:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-10 text-center">Fournisseurs</h1>
      <div
        className="grid px-20 gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        {suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
    </div>
  );
};
export default SuppliersPage;
