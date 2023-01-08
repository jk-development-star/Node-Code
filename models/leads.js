"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Leads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Leads.belongsTo(models.User, {
        as: "GeneratedBy",
        foreignKey: "generated_by",
        targetKey: "id",
      });
      Leads.belongsTo(models.User, {
        as: "AssignedTo",
        foreignKey: "assignee_id",
        targetKey: "id",
      });
    }
  }
  Leads.init(
    {
      lead_id: DataTypes.BIGINT,
      generated_by: DataTypes.INTEGER,
      assignee_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
      covered_aread: DataTypes.STRING,
      owner_name: DataTypes.STRING,
      owner_email: DataTypes.STRING,
      owner_phone: DataTypes.BIGINT,
      owner_address: DataTypes.STRING,
      owner_city: DataTypes.STRING,
      owner_state: DataTypes.STRING,
      owner_country: DataTypes.STRING,
      owner_zipcode: DataTypes.STRING,
      lead_budget: DataTypes.STRING,
      lead_remark_followup: DataTypes.STRING,
      lead_status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Leads",
    }
  );
  return Leads;
};
