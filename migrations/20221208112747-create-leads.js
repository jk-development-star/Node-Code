"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("Leads", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        lead_id: {
          allowNull: false,
          type: Sequelize.BIGINT,
        },
        generated_by: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        assignee_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        description: {
          type: Sequelize.STRING,
        },
        covered_aread: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        owner_name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        owner_email: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        owner_phone: {
          allowNull: false,
          type: Sequelize.BIGINT,
        },
        owner_address: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        owner_city: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        owner_state: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        owner_country: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        owner_zipcode: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        lead_budget: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        lead_remark_followup: {
          type: Sequelize.STRING,
        },
        lead_status: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deletedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => queryInterface.addIndex("Leads", ["owner_email"]))
      .then(() => queryInterface.addIndex("Leads", ["owner_phone"]))
      .then(() => queryInterface.addIndex("Leads", ["lead_budget"]))
      .then(() => queryInterface.addIndex("Leads", ["owner_address"]))
      .then(() => queryInterface.addIndex("Leads", ["covered_aread"]))
      .then(() => queryInterface.addIndex("Leads", ["lead_id"]))
      .then(() => queryInterface.addIndex("Leads", ["owner_city"]))
      .then(() => queryInterface.addIndex("Leads", ["owner_state"]))
      .then(() => queryInterface.addIndex("Leads", ["owner_zipcode"]));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Leads");
  },
};
