/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        id: "1322871832640012500",
        email: "menno@sandwichdigital.nl",
        first_name: "Menno",
        last_name: "van Voorst",
        flags: 0,
        class_id: "8327698165434904000",
        creation_date: new Date(),
        updated_on: new Date(),
        deletion_date: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
