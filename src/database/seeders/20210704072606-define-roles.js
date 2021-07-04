'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        value: 'ADMIN',
        description: 'main user',
      },
      {
        value: 'USER',
        description: 'regular user',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
