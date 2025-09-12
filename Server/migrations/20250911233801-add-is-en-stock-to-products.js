export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("products", "is_en_stock", {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn("products", "is_en_stock");
}
