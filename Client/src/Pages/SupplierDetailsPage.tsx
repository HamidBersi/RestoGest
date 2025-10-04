import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Phone, Mail, Building, AlertTriangle } from "lucide-react";
import { Button } from "../Components/ui/button";

type Supplier = {
  id: string;
  name: string;
  contact?: string;
  email?: string;
  address?: string;
  phone?: string;
  website?: string;
  sloganImage?: string;
  image?: string;
};

function getNumericId(idParam?: string) {
  if (!idParam) return "";
  const digits = idParam.match(/\d+/)?.[0] ?? "";
  return digits;
}

const SupplierDetailsPage = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setError("");
    setSupplier(null);

    const numericId = getNumericId(id);

    if (!numericId) {
      setError("Identifiant fournisseur invalide.");
      return;
    }

    const url = `http://localhost:4000/api/mock-suppliers/mock/${numericId}/info`;

    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(
            `Erreur ${res.status} sur ${url} ${text ? `: ${text}` : ""}`
          );
        }
        return res.json();
      })
      .then((data: Supplier) => setSupplier(data))
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) {
    return (
      <div className="m-10 p-6 border rounded-xl text-red-600 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        <span>{error}</span>
      </div>
    );
  }

  if (!supplier) return <div className="m-10">Chargement…</div>;

  return (
    <div className=" h-screen flex flex-col items-center justify-center border-2 p-8 m-10 rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{supplier.name}</h2>

      {(supplier.image || supplier.sloganImage) && (
        <img
          src={supplier.image ?? supplier.sloganImage}
          alt={supplier.name}
          className="w-40 h-40 object-cover rounded-full mb-6"
        />
      )}

      <div className="w-full space-y-3 text-base">
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          <span>{supplier.name}</span>
        </div>

        {supplier.address && (
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>{supplier.address}</span>
          </div>
        )}

        {supplier.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <span>{supplier.phone}</span>
          </div>
        )}

        {(supplier.email || supplier.contact) && (
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <span>{supplier.email ?? supplier.contact}</span>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          onClick={() =>
            (window.location.href = `/suppliers/${supplier.id}/products`)
          }
        >
          Produits
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          onClick={() => window.history.back()}
        >
          Retour
        </Button>
      </div>
    </div>
  );
};

export default SupplierDetailsPage;
