import { Request, Response } from "express";
import * as mockApi from "../services/mockSupplierApi.js";

type SupplierApi = {
  info: () => Promise<any>;
  products: () => Promise<any[]>;
};

const suppliersData = {
  "1": {
    info: mockApi.fetchSupplierInfo,
    products: mockApi.fetchSupplierProducts,
  },
  "2": {
    info: mockApi.fetchSupplier2Info,
    products: mockApi.fetchSupplier2Products,
  },
};
export async function getAllMockSuppliers(req: Request, res: Response) {
  const allSuppliers = await Promise.all(
    Object.values(suppliersData).map((supplier) => supplier.info())
  );
  res.json(allSuppliers);
}

export async function getSupplierXInfo(req: Request, res: Response) {
  const supplierId = req.params.id;
  const supplier = suppliersData[supplierId as keyof typeof suppliersData];
  if (!supplier) return res.status(404).json({ message: "Supplier not found" });
  const info = await supplier.info();
  res.json(info);
}

export async function getSupplierXProducts(req: Request, res: Response) {
  const supplierId = req.params.id;
  const supplier = suppliersData[supplierId as keyof typeof suppliersData];
  if (!supplier) return res.status(404).json({ message: "Supplier not found" });
  const products = await supplier.products();
  res.json(products);
}

export async function getSupplierXOneProduct(req: Request, res: Response) {
  const supplierId = req.params.id;
  const productId = req.params.productId;
  const supplier = suppliersData[supplierId as keyof typeof suppliersData];
  if (!supplier) return res.status(404).json({ message: "Supplier not found" });
  const products = await supplier.products();
  const product = products.find((p: any) => p.id === productId);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
}
