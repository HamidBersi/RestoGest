export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("suppliers", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false, unique: true },
    email: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    notes: { type: Sequelize.TEXT },
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
  await queryInterface.dropTable("suppliers");
}
