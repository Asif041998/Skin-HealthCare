const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const Updates = sequelize.define('app_updates', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    os_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    version: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
    { freezeTableName: true }
);

module.exports = Updates;