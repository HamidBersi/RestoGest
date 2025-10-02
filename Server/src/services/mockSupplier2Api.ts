export async function fetchSupplier2Products() {
  return [
    {
      id: "X1",
      name: "Tomates cerises",
      category: "Légumes",
      price: 3.0,
      stock: 150,
      unit: "kg",
      sku: "TOM-CER",
      vat_rate: 5.5,
    },
    {
      id: "X2",
      name: "Concombres",
      category: "Légumes",
      price: 1.5,
      stock: 100,
      unit: "kg",
      sku: "CON-COM",
      vat_rate: 5.5,
    },
    {
      id: "Y1",
      name: "Pommes Gala",
      category: "Fruits",
      price: 2.2,
      stock: 200,
      unit: "kg",
      sku: "POM-GAL",
      vat_rate: 5.5,
    },
    {
      id: "Y2",
      name: "Bananes",
      category: "Fruits",
      price: 1.8,
      stock: 180,
      unit: "kg",
      sku: "BAN-BAN",
      vat_rate: 5.5,
    },
    {
      id: "Z1",
      name: "Poulet entier",
      category: "Viandes",
      price: 5.5,
      stock: 75,
      unit: "kg",
      sku: "POU-ENT",
      vat_rate: 5.5,
    },
    {
      id: "Z2",
      name: "Steaks hachés",
      category: "Viandes",
      price: 8.0,
      stock: 60,
      unit: "kg",
      sku: "STE-HAC",
      vat_rate: 5.5,
    },
  ];
}
export async function fetchSupplier2Info() {
  return {
    id: "SUP2",
    name: "Fournisseur Fraîcheur",
    contact: "contact@fournisseurfraicheur.com",
    address: "45 avenue des Fleurs, 75000 Paris",
    phone: "01 98 76 54 32",
    website: "https://fournisseurfraicheur.com",
    sloganImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80",
  };
}
