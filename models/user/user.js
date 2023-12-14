const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    birth_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    race_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reset_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    delete_reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fcm_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = User;
