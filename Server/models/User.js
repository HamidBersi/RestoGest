import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize.js";

export class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("admin", "staff"),
      allowNull: false,
      defaultValue: "staff",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    underscored: true,
    timestamps: true,
    defaultScope: { attributes: { exclude: ["password_hash"] } },
    hooks: {
      beforeValidate(user) {
        if (user.email) user.email = user.email.trim().toLowerCase();
      },
    },
  }
);
