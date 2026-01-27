/**
 * realSupplierApi.ts
 *
 * Ce fichier contient les fonctions pour récupérer les données
 * depuis de vraies APIs externes (Fake Store API, etc.)
 */

/**
 * FOURNISSEUR 1 : Fake Store API
 *
 * API gratuite avec des produits réalistes, images, et prix
 * URL: https://fakestoreapi.com
 */

export async function fetchSupplier1Info() {
  // Info statique du fournisseur (pas besoin d'appel API)
  return {
    id: 1,
    name: "Global Electronics Store",
    contact: "support@globalelectronics.com",
    address: "123 Tech Street, San Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
    website: "https://fakestoreapi.com",
    sloganImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
  };
}

export async function fetchSupplier1Products() {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=10");
    if (!response.ok) {
      throw new Error(
        `Erreur API: ${response.status} ${response.statusText}`
      );
    }

    // ÉTAPE 3 : Convertir en JSON
    const products = await response.json();
    const transformedProducts = products.map((product: any) => ({
      id: String(product.id),
      name: product.title,
      category: product.category,
      price: product.price,
      stock: Math.floor(Math.random() * 200) + 50,
      unit: "pièce",
      image: product.image,
      description: product.description,
      rating: product.rating?.rate || 0,
      sku: `FAKE-${product.id}`,
    }));

    return transformedProducts;
  } catch (error) {
    console.error(
      "❌ Erreur lors de la récupération des produits:",
      error instanceof Error ? error.message : error
    );

    // Retourner un tableau vide en cas d'erreur
    // (au lieu de crash)
    return [];
  }
}

/**
 * FOURNISSEUR 2 : Open Food Facts API
 *
 * API GRATUITE avec des VRAIS produits alimentaires français !
 * - Vraies marques (Francine, Président, Lactel, etc.)
 * - Vraies images des emballages
 * - Base de données collaborative mondiale
 * URL: https://world.openfoodfacts.org
 */

export async function fetchSupplier2Info() {
  return {
    id: 2,
    name: "Open Food Market",
    contact: "contact@openfoodmarket.com",
    address: "45 avenue des Fleurs, 75000 Paris",
    phone: "01 98 76 54 32",
    website: "https://world.openfoodfacts.org",
    sloganImage:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
  };
}

export async function fetchSupplier2Products() {
  try {
    // On limite le temps d'attente par requête pour éviter les timeouts très longs
    const TIMEOUT_MS = 4000;

    // Chercher plusieurs catégories de produits alimentaires français (mais en parallèle)
    const searchTerms = [
      "farine francine",
      "sucre daddy",
      "lait lactel",
      "beurre president",
      "huile lesieur",
    ];

    const fetchWithTimeout = async (term: string) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
      try {
        const response = await fetch(
          `https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms=${encodeURIComponent(
            term
          )}&page_size=2&json=1&countries=France`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data.products ?? [];
      } finally {
        clearTimeout(timer);
      }
    };

    const settled = await Promise.allSettled(
      searchTerms.map((term) => fetchWithTimeout(term))
    );

    const allProducts: any[] = [];
    for (const result of settled) {
      if (result.status !== "fulfilled") continue;
      const products = result.value.slice(0, 2).map((p: any) => ({
        id: p.code || `OFF-${Math.random().toString(36).substr(2, 9)}`,
        name:
          p.product_name || p.product_name_fr || p.generic_name || "Produit alimentaire",
        category: p.categories_tags?.[0]?.replace("en:", "") || "Alimentaire",
        price: parseFloat((Math.random() * 15 + 2).toFixed(2)),
        stock: Math.floor(Math.random() * 200) + 30,
        unit: "unité",
        image:
          p.image_front_url ||
          p.image_url ||
          "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
        sku: p.code || `SKU-${Math.random().toString(36).substr(2, 6)}`,
        brand: p.brands || "Sans marque",
        description: p.generic_name || "",
      }));
      allProducts.push(...products);
    }

    console.log(`✅ ${allProducts.length} produits réels récupérés`);

    // Si l'API n'a rien retourné, fallback vers des données de base
    if (allProducts.length === 0) {
      console.log("⚠️ Utilisation du fallback (données de secours)");
      return [
        {
          id: "FALLBACK-1",
          name: "Farine de blé T55",
          category: "Épicerie",
          price: 2.5,
          stock: 100,
          unit: "kg",
          image:
            "https://images.unsplash.com/photo-1556910096-6f5e72db6803?auto=format&fit=crop&w=400&q=80",
          sku: "FAR-T55",
          brand: "Francine",
        },
        {
          id: "FALLBACK-2",
          name: "Sucre en poudre",
          category: "Épicerie",
          price: 1.8,
          stock: 150,
          unit: "kg",
          image:
            "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?auto=format&fit=crop&w=400&q=80",
          sku: "SUC-POU",
          brand: "Daddy",
        },
      ];
    }

    return allProducts.slice(0, 12); // Limite à 12 produits pour rester rapide
  } catch (error) {
    console.error("❌ Erreur Open Food Facts:", error);

    // Retour de données de secours en cas d'erreur totale
    return [
      {
        id: "ERROR-FALLBACK-1",
        name: "Produit de démonstration",
        category: "Alimentaire",
        price: 5.0,
        stock: 50,
        unit: "unité",
        image:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
        sku: "DEMO-001",
        brand: "Demo",
      },
    ];
  }
}
