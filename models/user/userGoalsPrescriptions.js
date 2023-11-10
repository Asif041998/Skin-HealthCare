const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const Prescription = require('../../models/user/prescriptions');

const GoalsPrescriptions = sequelize.define("user_goals_prescriptions", {
  user_goal_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true,
  },
  user_prescription_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true,
  },
}, {
  freezeTableName: true
});

GoalsPrescriptions.belongsTo(Prescription,{
  foreignKey: 'user_prescription_id',
  as: 'prescription'
});

module.exports = GoalsPrescriptions;
