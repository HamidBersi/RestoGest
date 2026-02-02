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

    const supplierId = Number(supplier_id);
    const orderedByUserId = Number(ordered_by_user_id);

    if (!Number.isInteger(supplierId) || supplierId <= 0) {
      return res.status(400).json({ message: "Invalid supplier_id" });
    }

    if (!Number.isInteger(orderedByUserId) || orderedByUserId <= 0) {
      return res.status(400).json({ message: "Invalid ordered_by_user_id" });
    }

    // ✅ S'assurer que le fournisseur existe (mock possible)
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      await Supplier.create({
        id: supplierId,
        name: `Mock Supplier ${supplierId}`,
        email: `mock-supplier-${supplierId}@restogest.local`,
        phone: null,
        address: null,
      });
    }

    const order = await Order.create({
      ordered_by_user_id: orderedByUserId,
      supplier_id: supplierId,
      status: "ordered",
    });

    // Création dynamique des order_items avec la quantité du body
    for (const item of products) {
      if (!item?.id || !item?.quantity) {
        return res
          .status(400)
          .json({ message: "Each product needs id and quantity" });
      }

      const numericId = Number(item.id);
      let product: Product | null = null;

      // 1) Si l'ID est numérique et existe en DB, on l'utilise
      if (Number.isInteger(numericId) && numericId > 0) {
        product = await Product.findByPk(numericId);
      }

      // 2) Sinon, on cherche via un SKU généré (cas produits mock)
      if (!product) {
        const supplierKey = supplier_id ?? "unknown";
        const sku = `MOCK-${supplierKey}-${item.id}`;
        product = await Product.findOne({ where: { sku } });

        if (!product) {
          const salePrice =
            typeof item.price === "number"
              ? item.price
              : Number(item.price ?? 0);
          const vatRate =
            typeof item.vat_rate === "number"
              ? item.vat_rate
              : Number(item.vat_rate ?? 20);

          product = await Product.create({
            name: item.name ?? `Produit ${item.id}`,
            sku,
            barcode: null,
            sale_price: Number.isNaN(salePrice) ? 0 : salePrice,
            vat_rate: Number.isNaN(vatRate) ? 20 : vatRate,
            is_en_stock: true,
          });
        }
      }

      await OrderItem.create({
        order_id: order.id,
        product_id: product.id,
        quantity: item.quantity,
        unit_price: product.sale_price,
        vat_rate: product.vat_rate,
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
          model: OrderItem,
          include: [{ model: Product }],
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
          model: OrderItem,
          include: [{ model: Product }],
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

    const validStatuses = ["draft", "ordered", "received", "cancelled"];
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
