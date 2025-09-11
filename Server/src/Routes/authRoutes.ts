import { Router } from "express";
import { createUser, loginUser } from "../controllers/usersController.js";
import { validate } from "../validation/validate.js";
import { createUserSchema } from "../validation/user.joi.js";

console;
const router = Router();

router.post("/register", validate(createUserSchema), createUser);
router.post("/login", loginUser);

export default router;
