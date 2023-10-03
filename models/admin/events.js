const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const Speakers = require("../../models/admin/speakers");
// Define a 'User' model representing the 'users' table in the database
const Events = sequelize.define(
  "events",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  program_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  file_type: {
    type: DataTypes.ENUM('audio', 'video'),
    allowNull: true,
  },
  content_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  speaker_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, { freezeTableName: true });

Events.belongsTo(Speakers, {
  foreignKey: "speaker_id",
  as: "speaker", // This should match the alias you used in the controller
});

module.exports = Events;
