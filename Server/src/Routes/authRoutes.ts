import { Router } from "express";
import { createUser, loginUser, me } from "../controllers/usersController.js";
import { validate } from "../validation/validate.js";
import { createUserSchema } from "../validation/user.joi.js";
import { sanitizeBody } from "../middleware/xss.js";
import multer from "multer";
const upload = multer();

const router = Router();

router.post(
  "/register",
  upload.single("avatar"),
  sanitizeBody(["name", "email", "role", "password"]),
  validate(createUserSchema),
  createUser
);
router.post("/login", sanitizeBody(["email", "password"]), loginUser);
router.get("/me", me);

export default router;
