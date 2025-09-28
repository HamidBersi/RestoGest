import { DataTypes, Model } from "sequelize";
import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToManyAddAssociationMixin,
  BelongsToManySetAssociationsMixin,
} from "sequelize";
import sequelize from "../sequelize.js";
import type { Supplier } from "./suppliersModel.js";

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare sku: string;
  declare barcode: string | null;
  declare sale_price: number;
  declare vat_rate: number;
  declare is_en_stock: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public addSupplier!: BelongsToManyAddAssociationMixin<Supplier, number>;
  public setSuppliers!: BelongsToManySetAssociationsMixin<Supplier, number>;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    sku: { type: DataTypes.STRING, allowNull: false, unique: true },
    barcode: { type: DataTypes.STRING, allowNull: true },
    sale_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    vat_rate: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
      defaultValue: 20,
    },
    is_en_stock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "products",
    modelName: "Product",
    timestamps: false,
    underscored: true,
  }
);
