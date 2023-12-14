const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");

const UserFCM = sequelize.define(
  "user_fcm_token",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fcm_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
);

module.exports = UserFCM;
