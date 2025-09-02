export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("order_items", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "orders", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "products", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    quantity: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
    unit_price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
    vat_rate: { type: Sequelize.DECIMAL(4, 2), allowNull: false },
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
  await queryInterface.addIndex("order_items", ["order_id"]);
  await queryInterface.addIndex("order_items", ["product_id"]);
}

export async function down(queryInterface) {
  await queryInterface.dropTable("order_items");
}
