/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("classes", [
      {
        id: "8327698165434904000",
        name: "Group 1",
        creation_date: new Date(),
        updated_on: new Date(),
        deletion_date: null,
      },
      {
        id: "9327698165434905000",
        name: "Group 2",
        creation_date: new Date(),
        updated_on: new Date(),
        deletion_date: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("classes", null, {});
  },
};
