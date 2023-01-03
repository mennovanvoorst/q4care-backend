/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("products", [
      {
        id: "8327698165444904000",
        name: "Access",
        description: "Toegang tot Q4Care portal",
        currency: "EUR",
        value: "30.00",
        days_valid: 365,
        creation_date: new Date(),
        updated_on: new Date(),
        deletion_date: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("products", null, {});
  },
};
