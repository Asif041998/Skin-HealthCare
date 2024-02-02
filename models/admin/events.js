const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const Speakers = require("../../models/admin/speakers");

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
    },
    dolby_viewers_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pubnub_channel_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pubnub_subscriber_key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pubnub_publisher_key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dolby_channel_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dolby_stream_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, { freezeTableName: true });

Events.belongsTo(Speakers, {
  foreignKey: "speaker_id",
  as: "speaker", 
});

module.exports = Events;
