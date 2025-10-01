type Supplier = {
  id: number;
  name: string;
  contact: string;
};

const SupplierCard = ({ supplier }: { supplier: Supplier }) => (
  <div className="bg-white rounded shadow p-4 flex flex-col mb-4">
    <span className="font-semibold">{supplier.name}</span>
    <span className="text-gray-500 text-sm">{supplier.contact}</span>
  </div>
);

export default SupplierCard;
