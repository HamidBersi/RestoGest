import "dotenv/config";
import { Sequelize } from "sequelize";

const url = process.env.PG_URL ?? process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    "DB URL manquante. Définis PG_URL (ou DATABASE_URL) dans Server/.env, ex:\n" +
      "PG_URL=postgres://postgres:postgres@localhost:5432/restogest"
  );
}

const sequelize = new Sequelize(url, {
  dialect: "postgres",
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

export default sequelize;
