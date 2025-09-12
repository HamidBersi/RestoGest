import { Router } from "express";
import { createOrder } from "../controllers/ordersController.js";
import { validate, idParamsSchema } from "../validation/validate.js";

const router = Router();

router.post("/", createOrder);
router.get("/", validate(idParamsSchema, "params"), createOrder);

export default router;
