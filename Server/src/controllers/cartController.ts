import { Request, Response } from "express";

type Carttem = { id: string; quantity: number };
type Cart = { userId: string; items: Carttem[] };

const carts = new Map<string, Cart>();

export function getCart(req: Request, res: Response) {
  const userId = String(req.query.userId);
  const cart = carts.get(userId) || { userId, items: [] };
  res.json(cart);
}

export function addItemToCart(req: Request, res: Response) {
  const userId = req.params.userId;
  const { productId, quantity } = req.body;

  if (!productId || typeof quantity !== "number" || quantity <= 0) {
    return res.status(400).json({ message: "Invalid productId or quantity" });
  }

  let cart = carts.get(userId);
  if (!cart) {
    cart = { userId, items: [] };
    carts.set(userId, cart);
  }

  const existingItem = cart.items.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ id: productId, quantity });
  }

  res.json(cart);
}

export function clearCart(req: Request, res: Response) {
  const userId = req.params.userId;
  carts.delete(userId);
  res.json({ message: "Cart cleared" });
}
