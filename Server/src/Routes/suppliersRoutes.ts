import { Router } from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../controllers/suppliersController.js";
import { sanitizeBody } from "../middleware/xss.js";

const router = Router();

router.post("/", sanitizeBody(["name", "email", "phone"]), createSupplier);
router.get("/", getAllSuppliers);
router.get("/:id", getSupplierById);
router.patch("/:id", sanitizeBody(["name", "email", "phone"]), updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;
