const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');
// Define a 'Speakers' model representing the 'Speakers' table in the database
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
},{freezeTableName:true});

module.exports = Speakers;