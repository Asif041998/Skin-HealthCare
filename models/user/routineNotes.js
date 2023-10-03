const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const Routines = require("../../models/user/routines");

const RoutineNotes = sequelize.define("skin_care_routine_notes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_skin_care_routine_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true
});

RoutineNotes.belongsTo(Routines, {
  foreignKey: "user_skin_care_routine_id",
  as: "routine", 
});

module.exports = RoutineNotes;
