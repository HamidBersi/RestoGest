import {
  DataTypes,
  Model,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToManySetAssociationsMixin,
} from "sequelize";
import sequelize from "../sequelize.js";
import { User } from "./usersModel.js";
import { Supplier } from "./suppliersModel.js";
import { Product } from "./ProductsModel.js";
console.log("Sequelize instance in [NOM_DU_MODELE]:", sequelize); // adjust path as needed

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: CreationOptional<number>;
  declare supplier_id: ForeignKey<Supplier["id"]>;
  declare ordered_by_user_id: ForeignKey<User["id"]>;
  declare status: "draft" | "pending" | "received" | "canceled" | "ordered";
  declare ordered_at: Date | null;
  declare received_at: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public setProducts!: BelongsToManySetAssociationsMixin<Product, number>;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    supplier_id: { type: DataTypes.INTEGER, allowNull: false },
    ordered_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
    status: {
      type: DataTypes.ENUM(
        "draft",
        "received",
        "ordered",
        "canceled",
        "pending"
      ),
      allowNull: false,
      defaultValue: "draft",
    },
    ordered_at: { type: DataTypes.DATE, allowNull: true },
    received_at: { type: DataTypes.DATE, allowNull: true },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "orders",
    modelName: "Order",
    underscored: true,
    timestamps: true,
  }
);
console.log("setProducts" in Order.prototype); // doit afficher true
