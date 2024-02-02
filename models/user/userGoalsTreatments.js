const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const Treatment = require('../../models/user/treatments');

const GoalsTreatments = sequelize.define("user_goal_facial_treatments", {
  user_goal_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true,
  },
  user_facial_treatment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true,
  },
}, {
  freezeTableName: true
});

GoalsTreatments.belongsTo(Treatment, {
  foreignKey: 'user_facial_treatment_id',
  as: 'treatment'
});

module.exports = GoalsTreatments;
