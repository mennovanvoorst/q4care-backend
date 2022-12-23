/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("skills", [
      {
        id: "7327698165434904000",
        name: "Wondspoelen via katheter",
        creation_date: new Date(),
        updated_on: new Date(),
        deletion_date: null,
      },
      {
        id: "7327698165434905000",
        name: "Verwijderen wondtampon",
        creation_date: new Date(),
        updated_on: new Date(),
        deletion_date: null,
      },
      {
        id: "7327698165434906000",
        name: "Verwijderen exudrain",
        creation_date: new Date(),
        updated_on: new Date(),
        deletion_date: null,
      },
      {
        id: "7327698165434907000",
        name: "Inbrengen perifere canule voor infuus (toedieningssysteem)",
        creation_date: new Date(),
        updated_on: new Date(),
        deletion_date: null,
      },
      {
        id: "7327698165434908000",
        name: "Epiduraal en intrathecaal (poort): aanprikken spinaal poortsysteem, verwisselen naald",
        creation_date: new Date(),
        updated_on: new Date(),
        deletion_date: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("skills", null, {});
  },
};
