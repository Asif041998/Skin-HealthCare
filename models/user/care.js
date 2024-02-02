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
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    skin_concern: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, { freezeTableName: true });

module.exports = Cares;