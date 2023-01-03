const { DataTypes } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      "payments",
      {
        id: {
          type: DataTypes.TEXT,
          primaryKey: true,
          unique: true,
        },
        user_id: DataTypes.TEXT,
        product_id: DataTypes.TEXT,
        external_id: DataTypes.TEXT,
        status: DataTypes.TEXT,
        currency: DataTypes.TEXT,
        value: DataTypes.TEXT,
        payment_date: Sequelize.DATE,
        creation_date: Sequelize.DATE,
        updated_on: Sequelize.DATE,
        deletion_date: Sequelize.DATE,
      },
      {
        timestamps: true,
      }
    ),
  down: (queryInterface) => queryInterface.dropTable("payments"),
};
