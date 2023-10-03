const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");

const Allergies = sequelize.define("user_allergies", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  allergen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  allergic_reaction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  healing_methods: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  freezeTableName: true
});

module.exports = Allergies;
