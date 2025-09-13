import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
} from "../controllers/ordersController.js";
import { validate, idParamsSchema } from "../validation/validate.js";
import { get } from "http";

const router = Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);

export default router;
