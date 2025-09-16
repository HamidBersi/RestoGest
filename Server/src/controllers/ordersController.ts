import { Request, Response } from "express";
import { Product } from "../models/ProductsModel.js";
import { Supplier } from "../models/suppliersModel.js";
import { Order } from "../models/ordersModel.js";
import { OrderItem } from "../models/orderItemsModel.js";

// Create a new order
export async function createOrder(req: Request, res: Response) {
  try {
    const { products, ordered_by_user_id, supplier_id } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "products must be a non-empty array" });
    }

    // Récupère les IDs pour vérifier l'existence des produits
    const productIds = products.map((p: any) => p.id);
    const foundProducts = await Product.findAll({ where: { id: productIds } });

    if (foundProducts.length !== productIds.length) {
      return res
        .status(400)
        .json({ message: "One or more products not found" });
    }

    const order = await Order.create({
      ordered_by_user_id,
      supplier_id,
      status: "pending",
    });

    // Création dynamique des order_items avec la quantité du body
    for (const item of products) {
      const product = foundProducts.find((p) => p.id === item.id);
      await OrderItem.create({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: product?.sale_price,
        vat_rate: product?.vat_rate,
      });
    }

    return res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product,
          through: { attributes: ["unit_price", "quantity"] },
        },
        {
          model: Supplier,
        },
      ],
    });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function getOrderById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "invalid id" });
    }
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Product,
          through: { attributes: ["unit_price", "quantity"] },
        },
        {
          model: Supplier,
        },
      ],
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateOrderStatus(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const validStatuses = [
      "draft",
      "pending",
      "received",
      "canceled",
      "ordered",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteOrder(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
