import { Link } from "react-router-dom";
import { Button } from "./ui/button"; // adapte le chemin si besoin

type Supplier = {
  id: number;
  name: string;
  contact: string;
  sloganImage?: string;
};

const SupplierCard = ({ supplier }: { supplier: Supplier }) => (
  <div className="rounded shadow-xl p-4 flex flex-col mb-4 items-center bg-blue-50">
    {supplier.sloganImage && (
      <img
        src={supplier.sloganImage}
        alt="Slogan-image"
        className="w-15 h-15 object-cover rounded-4xl mb-2 border"
      />
    )}
    <span className="font-semibold">{supplier.name}</span>
    <Link to={"mailto:" + supplier.contact} className="text-gray-500 text-xs">
      {supplier.contact}
    </Link>
    <div className="flex gap-4 items-center justify-center mt-4">
      <Link to={`/suppliers/${supplier.id}/products`}>
        <Button
          variant="outline"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Produits
        </Button>
      </Link>
      <Link to={`/suppliers/${supplier.id}`}>
        <Button
          variant="default"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Infos
        </Button>
      </Link>
    </div>
  </div>
);

export default SupplierCard;
