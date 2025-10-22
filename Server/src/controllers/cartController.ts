import { Request, Response } from "express";

type CartItem = { id: string; quantity: number };
type Cart = { supplierId: string | null; items: CartItem[] };

// stockage en mémoire (dev only)
const carts = new Map<string, Cart>();

export function getCart(req: Request, res: Response) {
  const userId = String(req.params.userId);
  const cart = carts.get(userId) ?? { supplierId: null, items: [] };
  return res.status(200).json(cart);
}

export function addItemToCart(req: Request, res: Response) {
  const userId = String(req.params.userId);
  const supplierId = String(req.params.supplierId);
  const { id, quantity } = req.body as { id?: string; quantity?: number };

  if (!id || !quantity || quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Invalid payload: id and positive quantity required" });
  }

  const cart = carts.get(userId) ?? { supplierId: supplierId, items: [] };

  if (cart.supplierId && cart.supplierId !== supplierId) {
    return res
      .status(400)
      .json({ message: "Cart already belongs to another supplier" });
  }
  cart.supplierId = supplierId;

  const existing = cart.items.find((it) => it.id === id);
  if (existing) existing.quantity += Number(quantity);
  else cart.items.push({ id, quantity: Number(quantity) });

  carts.set(userId, cart);
  return res.status(200).json(cart);
}

export function removeItemFromCart(req: Request, res: Response) {
  const userId = String(req.params.userId);
  const productId = String(req.params.productId);
  const { removeAll } = req.body as { removeAll?: boolean }; // optional

  const cart = carts.get(userId);
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  if (removeAll) {
    cart.items = cart.items.filter((i) => i.id !== productId);
  } else {
    const item = cart.items.find((i) => i.id === productId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });
    if (item.quantity > 1) item.quantity -= 1;
    else cart.items = cart.items.filter((i) => i.id !== productId);
  }

  // if no items left, clear supplierId
  if (cart.items.length === 0) cart.supplierId = null;

  carts.set(userId, cart);
  return res.status(200).json(cart);
}

export function clearCart(req: Request, res: Response) {
  const userId = String(req.params.userId);
  carts.delete(userId);
  return res.status(204).send();
}
