import argon2 from "argon2";
import { User } from "../models/usersModel.js";
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
    const { email, password, name, role, avatar } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const password_hash = await argon2.hash(password, ARGON_OPTS);

    const user = await User.create(
      { email, password_hash, name, role, avatar },
      { fields: ["email", "password_hash", "name", "role", "avatar"] }
    );

    return res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      is_active: user.is_active,
      avatar: user.avatar,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    });
  } catch (err) {
    const any = err as any;
    console.error("createUser error:", {
      name: any?.name,
      message: any?.message,
      parent: any?.parent?.message || any?.parent?.detail,
      errors: any?.errors,
    });

    if (any?.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }
    if (any?.name === "SequelizeDatabaseError") {
      return res
        .status(400)
        .json({ error: any?.parent?.message || any?.message });
    }
    if (any?.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ error: any?.errors?.map((e: any) => e.message) });
    }
    return next(err);
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      attributes: [
        "id",
        "email",
        "name",
        "role",
        "is_active",
        "password_hash",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!user || !user.password_hash) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isValid = await argon2.verify(user.password_hash, password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 jour
    });
    return res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error("Erreur loginUser:", err);
    return res.status(500).json({ message: "Internal server error" });
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

export async function getOneUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
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
    if (isNaN(id) || id <= 0) {
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
    if (isNaN(id) || id <= 0) {
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

export async function me(req: Request, res: Response) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jwt.verify(token, secret);
    let userId: number | undefined;
    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      userId = (decoded as { id: number }).id;
    }
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "role", "avatar"],
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
}
