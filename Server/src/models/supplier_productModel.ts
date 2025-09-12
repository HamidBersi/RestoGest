import sequelize from "../sequelize.js";
import { DataTypes, Model } from "sequelize";
import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import { Product } from "./ProductsModel.js";
import { Supplier } from "./suppliersModel.js";

export class SupplierProduct extends Model<
  InferAttributes<SupplierProduct>,
  InferCreationAttributes<SupplierProduct>
> {
  declare id: CreationOptional<number>;
  declare productId: ForeignKey<Product["id"]>;
  declare supplierId: ForeignKey<Supplier["id"]>;
  declare supplier_product_code: string | null;
  declare supplier_product_price: number | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

SupplierProduct.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "products", key: "id" },
      field: "product_id",
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "suppliers", key: "id" },
      field: "supplier_id",
    },
    supplier_product_code: { type: DataTypes.STRING, allowNull: true },
    supplier_product_price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize,
    tableName: "supplier_products",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["product_id", "supplier_id"],
      },
    ],
  }
);
