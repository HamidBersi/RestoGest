import argon2 from "argon2";
import { User } from "../models/userModel.js";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

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

    const user = await User.create(
      { email, password_hash, name, role },
      { fields: ["email", "password_hash", "name", "role"] }
    );
    return res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      is_active: user.is_active,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
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

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  // Vérifier les identifiants de l'utilisateur
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Identifiants invalides" });
  }

  const isValid = await argon2.verify(user.password_hash, password);
  if (!isValid) {
    return res.status(401).json({ error: "Identifiants invalides" });
  }

  // Générer un token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.json({ token });
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

export async function getOneUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    if (Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "invalid id" });
    }
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password_hash"],
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    if (Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "invalid id" });
    }
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { email, name, role, is_active } = req.body;
    if (email !== undefined) user.email = email;
    if (name !== undefined) user.name = name;
    if (role !== undefined) user.role = role;
    if (is_active !== undefined) user.is_active = is_active;

    await user.save();
    return res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      is_active: user.is_active,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
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

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "invalid id" });
    }
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}
export function logoutUser(req: Request, res: Response) {
  // Ici, vous pouvez gérer la déconnexion de l'utilisateur
  // Par exemple, en supprimant le token JWT du stockage local
  res.json({ message: "Déconnexion réussie" });
}
