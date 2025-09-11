import { Router } from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../controllers/suppliersController.js";

const router = Router();

router.post("/", createSupplier);
router.get("/", getAllSuppliers);
router.get("/:id", getSupplierById);
router.patch("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;
