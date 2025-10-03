import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SupplierDetailsPage = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/suppliers/mock/${id}/info`)
      .then((res) => res.json())
      .then((data) => setSupplier(data));
  }, [id]);

  if (!supplier) return <div>Chargement...</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-2">{supplier.name}</h2>
      <p>Email : {supplier.contact}</p>
      <p>Adresse : {supplier.address}</p>
      <p>Téléphone : {supplier.phone}</p>
    </div>
  );
};

export default SupplierDetailsPage;
