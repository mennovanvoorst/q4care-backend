const { DataTypes } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      "files",
      {
        id: {
          type: DataTypes.TEXT,
          primaryKey: true,
          unique: true,
        },
        learning_resource_id: {
          type: DataTypes.STRING,
        },
        name: DataTypes.TEXT,
        contents: DataTypes.TEXT,
        creation_date: Sequelize.DATE,
        updated_on: Sequelize.DATE,
        deletion_date: Sequelize.DATE,
      },
      {
        timestamps: true,
      }
    ),
  down: (queryInterface) => queryInterface.dropTable("files"),
};
