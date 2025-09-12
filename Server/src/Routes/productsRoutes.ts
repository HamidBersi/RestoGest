import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productsController.js";

const router = Router();

router.post("/", createProduct);
router.get("/", getAllProducts);

export default router;
