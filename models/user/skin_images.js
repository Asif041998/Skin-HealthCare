const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");

const SkinImages = sequelize.define("user_goal_images", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_goal_id: {
    type: DataTypes.INTEGER,
    primaryKey: false,
  },
  image_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  freezeTableName: true
});

module.exports = SkinImages;
