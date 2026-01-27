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
  const target = `/products/${id}`;

  return (
    <Link to={target} className="block h-full">
      <Card className="w-full h-full shadow-md hover:shadow-lg transition rounded-xl overflow-hidden p-1 cursor-pointer flex flex-col">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-full h-28 object-cover rounded-lg mb-1 border"
          />
        )}
        <CardHeader className="font-bold text-sm mb-0 flex-shrink-0">
          {name}
        </CardHeader>
        <CardContent className="mb-0 pb-0 flex-grow">
          <p className="text-xs text-gray-600 line-clamp-2 mb-0">
            {description}
          </p>
          {price !== undefined && (
            <p className="font-semibold text-md mt-6 px-2 rounded-xl bg-blue-500 text-white text-center w-35 ">
              {price} €
            </p>
          )}
        </CardContent>

        <CardFooter className="mt-4 pt-0 flex-shrink-0 justify-center">
          <div className="flex gap-2 items-center justify-center">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => {
                  e.stopPropagation();
                  setQty(Math.max(1, Number(e.target.value || 1)));
                }}
                className="w-16 p-1 border rounded text-sm"
              />
              <div className="w-24">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onAdd?.(id, qty);
                  }}
                  className="w-full h-full bg-green-600 hover:bg-green-700 text-white py-1 text-xs"
                >
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
