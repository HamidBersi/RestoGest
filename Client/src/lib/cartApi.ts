import { apiCall } from "./api";

export type CreateOrderPayload = {
  products: Array<{
    id: string;
    quantity: number;
    name?: string;
    price?: number;
    vat_rate?: number;
  }>;
  ordered_by_user_id: number;
  supplier_id: number;
};

// ✅ Ajouter un article au panier sur le serveur
export async function addItemToCart(
  userId: string,
  supplierId: string,
  productId: string,
  quantity: number,
) {
  return apiCall<{ supplierId: string; items: any[] }>(
    `/cart/${userId}/${supplierId}`,
    {
      method: "POST",
      body: JSON.stringify({ id: productId, quantity }),
    },
  );
}

// ✅ Récupérer le panier du serveur
export async function getCart(userId: string) {
  return apiCall<{ supplierId: string; items: any[] }>(`/cart/${userId}`);
}

// ✅ Retirer un article du panier
export async function removeItemFromCart(
  userId: string,
  productId: string,
  removeAll: boolean = true,
) {
  return apiCall(`/cart/${userId}/${productId}`, {
    method: "DELETE",
    body: JSON.stringify({ removeAll }),
  });
}

// ✅ Vider le panier
export async function clearCart(userId: string) {
  return apiCall(`/cart/${userId}`, {
    method: "DELETE",
  });
}

// ✅ **IMPORTANT : Créer une commande**
export async function submitOrder(payload: CreateOrderPayload) {
  return apiCall<{ id: string; status: string }>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
