export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn(
    "product_suppliers",
    "product_suppliers_name",
    {
      type: Sequelize.STRING,
      allowNull: true,
    }
  );
  await queryInterface.addColumn(
    "product_suppliers",
    "product_suppliers_code",
    {
      type: Sequelize.STRING,
      allowNull: true,
    }
  );
  await queryInterface.addColumn(
    "product_suppliers",
    "product_suppliers_price",
    {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    }
  );
}

export async function down(queryInterface) {
  await queryInterface.removeColumn(
    "product_suppliers",
    "product_suppliers_name"
  );
  await queryInterface.removeColumn(
    "product_suppliers",
    "product_suppliers_code"
  );
  await queryInterface.removeColumn(
    "product_suppliers",
    "product_suppliers_price"
  );
}
