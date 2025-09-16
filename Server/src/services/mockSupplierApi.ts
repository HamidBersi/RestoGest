export async function fetchSupplierProducts() {
  // Simule une réponse d’API fournisseur
  return [
    { id: "A1", name: "Farine", price: 2.5, stock: 100 },
    { id: "B2", name: "Sucre", price: 1.8, stock: 200 },
  ];
}

export async function fetchSupplierInfo() {
  return {
    id: "SUP1",
    name: "Fournisseur Test",
    contact: "test@fournisseur.com",
  };
}
