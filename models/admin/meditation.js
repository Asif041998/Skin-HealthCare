const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../../database/connection');

const Meditations = sequelize.define('events', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    program_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
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
        type: DataTypes.ENUM('active', 'cancelled'),
        allowNull: true,
    }
},
    { freezeTableName: true }
);

module.exports = Meditations;
