import { Router } from "express";
import { createUser, listUsers } from "../controllers/usersController.js";
import { validate } from "../validation/validate.js";
import { createUserSchema } from "../validation/user.joi.js";

const router = Router();

router.post("/", validate(createUserSchema), createUser);
router.get("/", listUsers);

export default router;
