import { Router } from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../controllers/suppliersController.js";
import { sanitizeBody } from "../middleware/xss.js";
import {
  fetchSupplierProducts,
  fetchSupplierInfo,
} from "../services/mockSupplierApi.js";

const router = Router();

router.post("/", sanitizeBody(["name", "email", "phone"]), createSupplier);
router.get("/", getAllSuppliers);
router.get("/:id", getSupplierById);
router.patch("/:id", sanitizeBody(["name", "email", "phone"]), updateSupplier);
router.delete("/:id", deleteSupplier);

router.get("/mock/products", async (req, res) => {
  const products = await fetchSupplierProducts();
  res.json(products);
});

router.get("/mock/info", async (req, res) => {
  const info = await fetchSupplierInfo();
  res.json(info);
});

export default router;
