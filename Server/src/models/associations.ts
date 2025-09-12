// Associations
import { User } from "./usersModel.js";
import { Order } from "./ordersModel.js";
import { Supplier } from "./suppliersModel.js";
import { Product } from "./ProductsModel.js";
import { SupplierProduct } from "./supplier_productModel.js";

// plusieuers fournisseurs peuvent fournir plusieurs produits (relation many-to-many)
Product.belongsToMany(Supplier, { through: "product_suppliers" });
Supplier.belongsToMany(Product, { through: "product_suppliers" });

// Un utilisateur peut avoir plusieurs commandes
User.hasMany(Order, { foreignKey: "ordered_by_user_id" });
Order.belongsTo(User, { foreignKey: "ordered_by_user_id" });

// Un fournisseur peut avoir plusieurs commandes
Supplier.hasMany(Order, { foreignKey: "supplier_id" });
Order.belongsTo(Supplier, { foreignKey: "supplier_id" });
