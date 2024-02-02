const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const Speakers = sequelize.define('speakers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qualifications: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, { freezeTableName: true });

module.exports = Speakers;