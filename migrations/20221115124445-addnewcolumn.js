'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Users', 'verificationToken', {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'generatedAt', {
        allowNull: true,
        type: Sequelize.DATE
      })
    ];
  },

  async down(queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Users', 'verificationToken'),
      queryInterface.removeColumn('Users', 'generatedAt')
    ];
  }
};
