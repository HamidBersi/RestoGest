export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("users", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password_hash: { type: Sequelize.STRING, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
    role: {
      type: Sequelize.ENUM("admin", "staff"),
      allowNull: false,
      defaultValue: "staff",
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("users");
  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_users_role";'
  );
}
