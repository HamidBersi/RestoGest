// src/components/ProductCard.tsx
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Link, useParams } from "react-router-dom";

type ProductProps = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  onAdd?: (productId: string, qty?: number) => void;
};

const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  onAdd,
}: ProductProps) => {
  const [qty, setQty] = useState<number>(1);
  const params = useParams<{ supplierId?: string; id?: string }>();
  const supplierId = params.supplierId ?? params.id;
  const target = supplierId
    ? `/suppliers/${supplierId}/products/${id}`
    : `/products/${id}`;

  return (
    <Card className="w-64 shadow-md hover:shadow-lg transition rounded-xl overflow-hidden p-1">
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-28 object-cover rounded-lg mb-1 border"
        />
      )}
      <CardHeader className="font-bold text-sm mb-0">{name}</CardHeader>
      <CardContent className="mb-0 pb-0">
        <p className="text-xs text-gray-600 line-clamp-2 mb-0">{description}</p>
        {price !== undefined && (
          <p className="font-semibold text-xs mt-1">{price} €</p>
        )}
      </CardContent>

      <CardFooter className="mt-1 pt-0">
        <div className="w-full flex gap-2 items-center">
          <Link to={target} className="flex-1">
            <Button className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white py-1 text-xs">
              Voir
            </Button>
          </Link>

          <div className="flex items-center gap-2 w-1/2">
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
              className="w-16 p-1 border rounded text-sm"
            />
            <div className="flex-1">
              <Button
                onClick={() => onAdd?.(id, qty)}
                className="w-full h-full bg-green-600 hover:bg-green-700 text-white py-1 text-xs"
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
