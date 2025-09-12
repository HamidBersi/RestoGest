"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("product_suppliers", {
    product_id: {
      type: Sequelize.INTEGER,
      references: { model: "products", key: "id" },
      onDelete: "CASCADE",
      primaryKey: true,
    },
    supplier_id: {
      type: Sequelize.INTEGER,
      references: { model: "suppliers", key: "id" },
      onDelete: "CASCADE",
      primaryKey: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("product_suppliers");
}
