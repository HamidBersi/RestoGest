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
    <Card className="w-64 shadow-md hover:shadow-lg transition rounded-xl overflow-hidden p-3">
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded-xl mb-4 border"
        />
      )}
      <CardHeader className="font-bold text-lg">{name}</CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        {price && <p className="font-semibold">{price} €</p>}
      </CardContent>
      <CardFooter>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
          Voir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
