import { Request, Response } from "express";
import { Product } from "../models/ProductsModel.js";
import { Supplier } from "../models/suppliersModel.js";
import { Order } from "../models/ordersModel.js";

// Create a new order
export async function createOrder(req: Request, res: Response) {
  try {
    const { productIds, ordered_by_user_id, supplier_id } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res
        .status(400)
        .json({ message: "productIds must be a non-empty array" });
    }
    if (!ordered_by_user_id || typeof ordered_by_user_id !== "number") {
      return res
        .status(400)
        .json({ message: "ordered_by_user_id must be a valid number" });
    }
    if (!supplier_id || typeof supplier_id !== "number") {
      return res
        .status(400)
        .json({ message: "supplier_id must be a valid number" });
    }

    // Verify that all product IDs exist
    const products = await Product.findAll({
      where: { id: productIds },
    });

    if (products.length !== productIds.length) {
      return res
        .status(400)
        .json({ message: "One or more products not found" });
    }

    // Create the order
    const order = await Order.create({
      ordered_by_user_id,
      supplier_id,
      status: "pending", // Default status
    });

    // Associate products with the order
    await order.setProducts(products);

    return res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Get all orders
