const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");

const Goals = sequelize.define("user_goals", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  goal_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  purpose: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reached_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  freezeTableName: true
});

module.exports = Goals;
