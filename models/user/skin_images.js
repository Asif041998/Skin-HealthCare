const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");

const SkinImages = sequelize.define("user_skin_images", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  goal_type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  freezeTableName: true
});

module.exports = SkinImages;
