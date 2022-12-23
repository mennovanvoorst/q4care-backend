const { DataTypes } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      "login_tokens",
      {
        user_id: {
          type: DataTypes.STRING,
        },
        token: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        creation_date: Sequelize.DATE,
        updated_on: Sequelize.DATE,
        deletion_date: Sequelize.DATE,
      },
      {
        timestamps: true,
      }
    ),
  down: (queryInterface) => queryInterface.dropTable("login_tokens"),
};
