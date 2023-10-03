const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");

const Products_Types = sequelize.define("product_types", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  expiration_duration_days: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  freezeTableName: true
});

module.exports = Products_Types;
