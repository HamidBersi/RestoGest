import { Router } from "express";
import {
  createUser,
  deleteUser,
  getOneUser,
  listUsers,
  loginUser,
  updateUser,
} from "../controllers/usersController.js";
import { validate } from "../validation/validate.js";
import { createUserSchema } from "../validation/user.joi.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// --- PUBLIC ---
router.post("/", validate(createUserSchema), createUser); // inscription
router.post("/login", loginUser); // login → renvoie un token

// --- PROTÉGÉ : tout ce qui suit demande un token ---
router.use(requireAuth);

router.get("/", listUsers);
router.get("/:id", getOneUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
