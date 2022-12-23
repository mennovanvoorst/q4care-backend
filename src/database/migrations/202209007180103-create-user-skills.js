const { DataTypes } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      "user_skills",
      {
        user_id: DataTypes.TEXT,
        skill_id: DataTypes.TEXT,
        achievement_date: Sequelize.DATE,
        creation_date: Sequelize.DATE,
        updated_on: Sequelize.DATE,
      },
      {
        timestamps: true,
      }
    ),
  down: (queryInterface) => queryInterface.dropTable("user_skills"),
};
