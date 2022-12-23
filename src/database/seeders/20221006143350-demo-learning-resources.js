/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("learning_resources", [
      {
        id: "1422871832640012500",
        title: "informative text",
        body: "this is very informative",
        creation_date: new Date(),
        updated_on: new Date(),
        deletion_date: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("learning_resources", null, {});
  },
};
