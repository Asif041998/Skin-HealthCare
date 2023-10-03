const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");

const Routines = sequelize.define("user_skin_care_routine", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timeframe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true
});

module.exports = Routines;
