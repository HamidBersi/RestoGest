// src/components/ProductCard.tsx
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { toast } from "sonner";

type ProductProps = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  supplierId: string; // 🆕 Le fournisseur
  onAdd?: (productId: string, qty?: number) => void;
};

const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  supplierId,
  onAdd,
}: ProductProps) => {
  const [qty, setQty] = useState<number>(1);
  const { addToCart, cart } = useCart(); // 🆕 Récupère aussi le cart
  const target = `/products/${id}`;

  // ✅ Vérifier si le produit est déjà dans le panier
  const existingItem = cart.items.find((item) => item.productId === id);
  const isInCart = !!existingItem;

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
          <div className="flex gap-2 items-center justify-center w-full">
            <div className="flex items-center gap-2 flex-1">
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
              <div className="flex-1">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    // 🆕 Ajouter au panier avec CartContext
                    addToCart(
                      {
                        id, // Identifiant unique
                        productId: id,
                        name,
                        price: price || 0,
                        quantity: qty,
                      },
                      supplierId,
                    );

                    // Afficher une notification
                    toast.success(`${name} ajouté au panier !`);

                    // Appeler le callback parent si défini
                    onAdd?.(id, qty);
                  }}
                  className="w-full h-full bg-green-600 hover:bg-green-700 text-white py-1 text-xs"
                >
                  Ajouter
                </Button>
              </div>
            </div>

            {/* 🆕 Badge "Dans le panier" à côté du bouton */}
            {isInCart && (
              <span className="bg-blue-500 text-white text-[12px] px-3 py-1 rounded-full font-bold whitespace-nowrap">
                ✓ {existingItem?.quantity}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
