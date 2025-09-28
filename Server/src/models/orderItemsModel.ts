import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize.js";
import { number } from "joi";

export class OrderItem extends Model {
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
}

OrderItem.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    vat_rate: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "order_items",
    modelName: "OrderItem",
    timestamps: false,
    underscored: true,
  }
);
sequelize.models.OrderItem = OrderItem;
