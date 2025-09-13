// Associations
import { User } from "./usersModel.js";
import { Order } from "./ordersModel.js";
import { Supplier } from "./suppliersModel.js";
import { Product } from "./ProductsModel.js";
import { OrderItem } from "./orderItemsModel.js";

// plusieurs fournisseurs peuvent fournir plusieurs produits (relation many-to-many)
Product.belongsToMany(Supplier, { through: "product_suppliers" });
Supplier.belongsToMany(Product, { through: "product_suppliers" });

// Un utilisateur peut avoir plusieurs commandes
User.hasMany(Order, { foreignKey: "ordered_by_user_id" });
Order.belongsTo(User, { foreignKey: "ordered_by_user_id" });

// Un fournisseur peut avoir plusieurs commandes
Supplier.hasMany(Order, { foreignKey: "supplier_id" });
Order.belongsTo(Supplier, { foreignKey: "supplier_id" });

Order.belongsToMany(Product, {
  through: OrderItem,
  foreignKey: "order_id",
  otherKey: "product_id",
});
Product.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: "product_id",
  otherKey: "order_id",
});

// Optionnel : associations directes pour accéder aux items
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });
