import express from "express";
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:userId", getCart);

router.post("/:userId/:supplierId/add", addItemToCart);

router.post("/:userId/product/:productId/remove", removeItemFromCart);

router.delete("/:userId", clearCart);

export default router;
