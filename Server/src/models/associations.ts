// Associations
import { Supplier } from "./suppliersModel.js";
import { Product } from "./ProductsModel.js";
import { SupplierProduct } from "./supplier_productModel.js";

Product.belongsToMany(Supplier, { through: "product_suppliers" });
Supplier.belongsToMany(Product, { through: "product_suppliers" });
