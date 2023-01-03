const { DataTypes } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      "products",
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.STRING,
        },
        currency: {
          type: DataTypes.STRING,
        },
        value: {
          type: DataTypes.STRING,
        },
        days_valid: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        creation_date: Sequelize.DATE,
        updated_on: Sequelize.DATE,
        deletion_date: Sequelize.DATE,
      },
      {
        timestamps: true,
      }
    ),
  down: (queryInterface) => queryInterface.dropTable("products"),
};
