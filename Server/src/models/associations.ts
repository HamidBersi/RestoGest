// Associations
import { Supplier } from "./suppliersModel.js";
import { Product } from "./ProductsModel.js";
import { SupplierProduct } from "./supplier_productModel.js";

//  product_suppliers
Product.belongsToMany(Supplier, { through: SupplierProduct });
Supplier.belongsToMany(Product, { through: SupplierProduct });
