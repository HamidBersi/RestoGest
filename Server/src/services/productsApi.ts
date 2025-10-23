export type Product = {
  id: number;
  title: string;
  description?: string;
  price: number;
  category?: string;
  thumbnail?: string;
  images?: string[]; // galerie
};

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ?? "https://dummyjson.com";

export async function fetchProducts(params?: {
  q?: string;
  limit?: number;
  skip?: number;
}) {
  const url = new URL(`${BASE_URL}/products${params?.q ? "/search" : ""}`);
  if (params?.q) url.searchParams.set("q", params.q);
  if (params?.limit) url.searchParams.set("limit", String(params.limit));
  if (params?.skip) url.searchParams.set("skip", String(params.skip));

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data: ProductsResponse = await res.json();

  // normalise une image principale
  const list = (data.products ?? []).map((p) => ({
    ...p,
    image: p.thumbnail ?? p.images?.[0] ?? "",
  }));

  return { items: list, total: data.total };
}
