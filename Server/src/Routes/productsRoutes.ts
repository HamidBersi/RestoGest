import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/productsController.js";
import { sanitizeBody } from "../middleware/xss.js";

const router = Router();

router.post("/", sanitizeBody(["name", "description", "price"]), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.patch(
  "/:id",
  sanitizeBody(["name", "description", "price"]),
  updateProduct
);
router.delete("/:id", deleteProduct);

export default router;
