import { Router } from "express";
import {
  listUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";

const router = Router();

router.get("/", listUsers);
router.get("/:id", getOneUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
