// src/components/ProductCard.tsx
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
  onAdd?: (productId: string) => void;
};

const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  onAdd,
}: ProductProps) => {
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
        <div className="w-full flex gap-2">
          <Link to={target} className="flex-1">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 text-xs">
              Voir
            </Button>
          </Link>

          <Button
            onClick={() => onAdd?.(id)}
            className="flex-blue bg-blue-600 hover:bg-blue-700 text-white py-1 text-xs"
          >
            Ajouter au panier
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
