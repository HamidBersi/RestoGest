export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("products", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
    sku: { type: Sequelize.STRING, allowNull: false, unique: true },
    barcode: { type: Sequelize.STRING },
    sale_price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    vat_rate: {
      type: Sequelize.DECIMAL(4, 2),
      allowNull: false,
      defaultValue: 20.0,
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
  await queryInterface.addIndex("products", ["sku"]);
}

export async function down(queryInterface) {
  await queryInterface.dropTable("products");
}
