import { Router } from "express";
import { createSupplier } from "../controllers/suppliersController.js";

const router = Router();

router.post("/", createSupplier);

export default router;
