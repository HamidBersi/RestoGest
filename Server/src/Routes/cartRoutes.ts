import { Router } from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cartController.js";
import { sanitizeBody } from "../middleware/xss.js";

const router = Router();

router.post("/add", sanitizeBody(["productId", "quantity"]), addToCart);
router.get("/", getCart);
router.patch(
  "/update",
  sanitizeBody(["productId", "quantity"]),
  updateCartItem
);
router.delete("/remove/:productId", removeFromCart);
router.delete("/clear", clearCart);

export default router;
