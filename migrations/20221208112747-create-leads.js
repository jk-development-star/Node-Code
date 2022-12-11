'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Leads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lead_id: {
        type: Sequelize.BIGINT
      },
      generated_by: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      assignee_id: {
        type: Sequelize.STRING
      },
      covered_aread: {
        type: Sequelize.STRING
      },
      owner_name: {
        type: Sequelize.STRING
      },
      owner_email: {
        type: Sequelize.STRING
      },
      owner_phone: {
        type: Sequelize.BIGINT
      },
      owner_address: {
        type: Sequelize.STRING
      },
      owner_city: {
        type: Sequelize.STRING
      },
      owner_state: {
        type: Sequelize.STRING
      },
      owner_country: {
        type: Sequelize.STRING
      },
      owner_zipcode: {
        type: Sequelize.STRING
      },
      lead_budget: {
        type: Sequelize.STRING
      },
      lead_remark_followup: {
        type: Sequelize.STRING
      },
      lead_status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Leads');
  }
};