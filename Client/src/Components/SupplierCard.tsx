import { Link } from "react-router-dom";

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
  </div>
);

export default SupplierCard;
