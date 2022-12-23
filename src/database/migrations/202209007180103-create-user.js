const { DataTypes } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      "users",
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          unique: true,
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
        },
        class_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        flags: DataTypes.INTEGER,
        creation_date: Sequelize.DATE,
        updated_on: Sequelize.DATE,
        deletion_date: Sequelize.DATE,
      },
      {
        timestamps: true,
      }
    ),
  down: (queryInterface) => queryInterface.dropTable("users"),
};
