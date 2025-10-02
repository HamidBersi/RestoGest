import { useEffect, useState } from "react";
import SupplierCard from "../Components/SupplierCard";

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<
    Array<{ id: number; name: string; contact: string }>
  >([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/mock-suppliers/mock", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSuppliers(data || []))
      .catch((err) => console.error("Failed to fetch suppliers:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fournisseurs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
    </div>
  );
};
export default SuppliersPage;
