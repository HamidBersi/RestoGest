import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize.js";

export class SupplierProduct extends Model {}

SupplierProduct.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "products", key: "id" },
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "suppliers", key: "id" },
    },
    supplier_product_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    supplier_product_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    purchase_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    // Ajoute d'autres attributs spécifiques à la relation ici
  },
  {
    sequelize,
    modelName: "SupplierProduct",
    tableName: "supplier_product",
    timestamps: false,
    underscored: true,
  }
);
