import argon2 from "argon2";
import { User } from "../models/User.js";
import { Request, Response, NextFunction } from "express";

const ARGON_OPTS = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 3,
  parallelism: 1,
};

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, name, role } = req.body;

    // Hash Argon2 (sel inclus, format PHC)
    const password_hash = await argon2.hash(password, ARGON_OPTS);

    const user = await User.create({ email, password_hash, name, role });
    return res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      is_active: user.is_active,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "name" in err &&
      (err as { name: string }).name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }
    next(err);
  }
}

export async function listUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = Math.max(1, Number(req.query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(req.query.limit ?? 20)));
    const offset = (page - 1) * limit;

    const { rows, count } = await User.findAndCountAll({
      offset,
      limit,
      order: [["created_at", "DESC"]],
      attributes: [
        "id",
        "email",
        "name",
        "role",
        "is_active",
        "created_at",
        "updated_at",
      ],
    });

    res.json({ data: rows, total: count, page, limit });
  } catch (err) {
    next(err);
  }
}
