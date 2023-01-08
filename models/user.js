"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Leads, {
        as: "GeneratedBy",
        foreignKey: "generated_by",
        sourceKey: "id",
      });
      User.hasMany(models.Leads, {
        as: "AssignedTo",
        foreignKey: "assignee_id",
        sourceKey: "id",
      });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      verificationToken: DataTypes.STRING,
      generatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
