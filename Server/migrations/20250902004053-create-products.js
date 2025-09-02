export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("orders", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    supplier_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "suppliers", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    ordered_by_user_id: {
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    status: {
      type: Sequelize.ENUM("draft", "ordered", "received", "cancelled"),
      allowNull: false,
      defaultValue: "draft",
    },
    ordered_at: { type: Sequelize.DATE },
    received_at: { type: Sequelize.DATE },
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
  await queryInterface.addIndex("orders", ["status", "ordered_at"]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("orders");
  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_orders_status";'
  );
}
