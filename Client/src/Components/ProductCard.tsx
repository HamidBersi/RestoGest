// src/components/ProductCard.tsx
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../Components/ui/card";

import { Button } from "../Components/ui/button";

type ProductProps = {
  name: string;
  description?: string;
  price?: number;
  image?: string;
};

const ProductCard = ({ name, description, price, image }: ProductProps) => {
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
        {price && <p className="font-semibold text-xs mt-1">{price} €</p>}
      </CardContent>
      <CardFooter className="mt-1 pt-0">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-1 text-xs">
          Voir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
