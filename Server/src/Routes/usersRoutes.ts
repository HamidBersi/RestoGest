import { Router } from "express";
import {
  listUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
import { sanitizeBody } from "../middleware/xss.js";

const router = Router();

router.get("/", listUsers);
router.get("/:id", getOneUser);
router.patch("/:id", sanitizeBody(["username", "email", "password"]), updateUser);
router.delete("/:id", deleteUser);

export default router;
