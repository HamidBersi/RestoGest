import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/ordersController.js";
import { sanitizeBody } from "../middleware/xss.js";

const router = Router();

router.post("/", sanitizeBody(["product", "quantity"]), createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/:id", sanitizeBody(["product", "quantity"]), updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
