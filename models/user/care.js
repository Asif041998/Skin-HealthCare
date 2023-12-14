const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const Cares = sequelize.define('cares', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    answer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    skin_concern: {
        type: DataTypes.STRING,
        allowNull: true,
    }

}, { freezeTableName: true });

module.exports = Cares;