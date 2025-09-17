import {
  fetchSupplierInfo,
  fetchSupplierProducts,
} from "../services/mockSupplierApi.js";
import { Router } from "express";

import { Request, Response, NextFunction } from "express";

const router = Router();

router.get("/mock/products", async (req: Request, res: Response) => {
  const products = await fetchSupplierProducts();
  res.json(products);
});

router.get("/mock/info", async (req: Request, res: Response) => {
  const info = await fetchSupplierInfo();
  res.json(info);
});

export default router;
