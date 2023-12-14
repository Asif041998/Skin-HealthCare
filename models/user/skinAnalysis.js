const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");

const SkinAnalysis = sequelize.define("skin_health_analysis", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dark_circle: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  skin_dullness: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  skin_health: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  redness: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  hydration: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  texture:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  hyperpigmentation:{
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  freezeTableName: true
});

module.exports = SkinAnalysis;
