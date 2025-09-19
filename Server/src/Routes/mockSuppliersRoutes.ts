import {
  fetchSupplierInfo,
  fetchSupplierProducts,
} from "../services/mockSupplierApi.js";
import { Router } from "express";

import { Request, Response, NextFunction } from "express";
import { getActiveResourcesInfo } from "process";
import {
  getSupplierXInfo,
  getSupplierXOneProduct,
  getSupplierXProducts,
} from "../controllers/mockSuppliersController.js";

const router = Router();

router.get("/mock/:id/info", getSupplierXInfo);
router.get("/mock/:id/products", getSupplierXProducts);
router.get("/mock/:id/products/:productId", getSupplierXOneProduct);

export default router;
