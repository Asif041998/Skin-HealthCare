const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const Verily = sequelize.define('study_participants', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    collaborator_id: {
        type: DataTypes.INTEGER,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, { freezeTableName: true });

module.exports = Verily;