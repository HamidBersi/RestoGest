import { Router } from "express";
import { createUser, loginUser } from "../controllers/usersController.js";
import { validate } from "../validation/validate.js";
import { createUserSchema } from "../validation/user.joi.js";
import { sanitizeBody } from "../middleware/xss.js";
import multer from "multer";
const upload = multer();

const router = Router();
console.log("authRoutes loaded");

router.post(
  "/register",
  upload.single("avatar"),
  sanitizeBody(["name", "email", "role", "password"]),
  validate(createUserSchema),
  createUser
);
router.post("/login", sanitizeBody(["email", "password"]), loginUser);

export default router;
