import { Router } from "express";
import {
  createUser,
  getOneUser,
  listUsers,
} from "../controllers/usersController.js";
import { validate } from "../validation/validate.js";
import { createUserSchema } from "../validation/user.joi.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", validate(createUserSchema), createUser);
router.get("/", requireAuth, listUsers);
router.get("/:id", requireAuth, getOneUser);

export default router;
