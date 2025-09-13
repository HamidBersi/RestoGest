import "./models/associations.js";
import { Order } from "./models/ordersModel.js";
import { Product } from "./models/ProductsModel.js";

async function test() {
  const order = await Order.create({
    supplier_id: 1,
    ordered_by_user_id: 1,
    status: "draft",
  });

  console.log("setProducts" in order); // doit afficher true
  console.log(order.setProducts); // doit afficher [Function]
}

test();
