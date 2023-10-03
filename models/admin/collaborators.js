const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");

const Collaborator = sequelize.define("collaborators", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    join_year: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    participation_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    learning_outcome: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    video_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    web_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    { freezeTableName: true }
);

module.exports = Collaborator;
