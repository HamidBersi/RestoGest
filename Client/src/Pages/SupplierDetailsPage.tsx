import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tel } from "react-lucide";

const SupplierDetailsPage = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/mock-suppliers/mock/${id}/info`)
      .then((res) => res.json())
      .then((data) => setSupplier(data));
  }, [id]);

  if (!supplier) return <div>Chargement...</div>;

  return (
    <div className="flex flex-col items-center justify-center border-2 p-8 m-10">
      <h2 className="text-xl font-bold mb-2">{supplier.name}</h2>
      <img src={supplier.image} alt={supplier.name} />
      <h3>{supplier.name}</h3>
      <p>{supplier.address}</p>
      <p>
        {" "}
        <span></span>
        {supplier.phone}
      </p>
    </div>
  );
};

export default SupplierDetailsPage;
