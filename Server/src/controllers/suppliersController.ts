import { Supplier } from "../models/suppliersModel.js";
import { Request, Response, NextFunction } from "express";

export async function createSupplier(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, phone, address } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const supplier = await Supplier.create(
      { name, email, phone, address },
      { fields: ["name", "email", "phone", "address"] }
    );

    return res.status(201).json({
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      createdAt: supplier.createdAt,
      updatedAt: supplier.updatedAt,
    });
  } catch (err) {
    const any = err as any;
    if (any.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ message: "A supplier with this email already exists." });
    }
    next(err);
  }
}
