import { Router } from "express";
import {
  addItemToCart
  clearCart,
  getCart,
  removeItemFromCart,
} from "../controllers/cartController.js";
import { sanitizeBody } from "../middleware/xss.js";

const router = Router();

router.post("/add", sanitizeBody(["productId", "quantity"]), addItemToCart);
router.get("/", getCart);
router.patch(
  "/update",
  sanitizeBody(["productId", "quantity"]),
  clearCart
);
router.delete("/remove/:productId", removeItemFromCart);
router.delete("/clear", clearCart);

export default router;
