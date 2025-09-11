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
export async function getAllSuppliers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const suppliers = await Supplier.findAll();
    return res.json(suppliers);
  } catch (err) {
    next(err);
  }
}
export async function getSupplierById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "invalid id" });
    }
    const user = await Supplier.findByPk(id, {
      attributes: [
        "id",
        "name",
        "email",
        "phone",
        "address",
        "createdAt",
        "updatedAt",
      ],
      // include: [{ model: Order, as: 'orders' }], // Exemple d'inclusion si nécessaire
      // include: [{ model: Product, as: 'products' }], // Exemple d'inclusion si nécessaire
      // include other associations as needed
      // Exclude sensitive fields if any
      // Example: attributes: { exclude: ['sensitiveField'] }
      // Adjust according to your model's fields and associations
      // This is just a template
    });
    if (!user) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    return res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateSupplier(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "invalid id" });
    }
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    const { name, email, phone, address } = req.body;
    if (name !== undefined) supplier.name = name;
    if (email !== undefined) supplier.email = email;
    if (phone !== undefined) supplier.phone = phone;
    if (address !== undefined) supplier.address = address;

    await supplier.save();
    return res.json({
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

export async function deleteSupplier(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "invalid id" });
    }
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    await supplier.destroy();
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}
