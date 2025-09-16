import { Router } from "express";
import { createUser, loginUser } from "../controllers/usersController.js";
import { validate } from "../validation/validate.js";
import { createUserSchema } from "../validation/user.joi.js";
import { sanitizeBody } from "../middleware/xss.js";

const router = Router();

router.post(
  "/register",
  sanitizeBody(["username", "email", "password"]),
  validate(createUserSchema),
  createUser
);
router.post("/login", sanitizeBody(["email", "password"]), loginUser);

export default router;
