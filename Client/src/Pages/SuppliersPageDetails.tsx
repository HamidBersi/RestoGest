import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SupplierDetailsPage = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState<any>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/api/mock-suppliers/mock/${id}/info`)
      .then((res) => res.json())
      .then((data) => setSupplier(data));
  }, [id]);

  if (!supplier) return <div>Chargement...</div>;

  return (
    <div className="flex flex-col items-center justify-center border-2 p-8 m-8 rounded shadow-lg bg-blue-50">
      <h2 className="text-xl font-bold mb-2">{supplier.name}</h2>
      <p>Email : {supplier.contact}</p>
      <p>Adresse : {supplier.address}</p>
      <p>Téléphone : {supplier.phone}</p>
    </div>
  );
};

export default SupplierDetailsPage;
