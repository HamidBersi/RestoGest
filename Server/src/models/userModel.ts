// src/models/User.ts
import { DataTypes, Model } from "sequelize";
import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../sequelize.js";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password_hash: string;
  declare name: string;
  declare role: "admin" | "staff";
  declare is_active: CreationOptional<boolean>;

  // Attributs camelCase côté code
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

console.log("createdAt attr:", User.getAttributes().createdAt);
User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
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
    tableName: "users",
    modelName: "User",
    timestamps: true,
    underscored: true,
    defaultScope: { attributes: { exclude: ["password_hash"] } },
  }
);
