const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const Goals = require("../../models/user/goals");

const Prescriptions = sequelize.define("user_prescriptions", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  diagnosis: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  visit_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('current', 'past'),
    defaultValue: 'current', // Set the default value to 'current'
  }
}, {
  freezeTableName: true
});

module.exports = Prescriptions;
