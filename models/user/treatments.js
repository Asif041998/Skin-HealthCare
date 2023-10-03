const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const Goals = require("../../models/user/goals");

const Treatments = sequelize.define("user_facial_treatments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  freezeTableName: true
});

module.exports = Treatments;
