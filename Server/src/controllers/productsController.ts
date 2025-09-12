import { Product } from "../models/ProductsModel.js";
import { Request, Response, NextFunction } from "express";
import { Supplier } from "../models/suppliersModel.js";
import "../models/associations.js";
import { number } from "joi";

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { suppliers, ...productData } = req.body;

    const product = await Product.create(productData);

    if (Array.isArray(suppliers) && suppliers.length > 0) {
      for (const s of suppliers) {
        const supplier = await Supplier.findByPk(s.id);
        if (supplier) {
          await product.addSupplier(supplier, {
            through: {
              supplier_product_name: s.supplier_product_name,
              supplier_product_code: s.supplier_product_code,
              purchase_price: s.purchase_price,
            },
          });
        }
      }
    }
    return res.status(201).json({
      id: product.id,
      name: product.name,
      stock_number: product.sku,
      price: product.barcode,
      in_stock: product.is_en_stock,
      vat_rate: product.vat_rate,

      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  } catch (err) {
    next(err);
  }
}
export async function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}

export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "invalid id" });
    }
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Supplier,
          through: {
            attributes: [
              "supplier_product_name",
              "supplier_product_code",
              "supplier_product_price",
            ],
          },
        },
      ],
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    next(err);
  }
}
