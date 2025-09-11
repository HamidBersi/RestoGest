export async function up(queryInterface, Sequelize) {
  await queryInterface
    .createTable("suppliers", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
      contact_email: { type: Sequelize.STRING },
      phone_number: { type: Sequelize.STRING },
      address: { type: Sequelize.TEXT },
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
    })
    .catch((error) => {
      console.error("Error creating suppliers table:", error);
      throw error;
    });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("suppliers");
}
