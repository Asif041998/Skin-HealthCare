const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/connection');

class SkincareSuggestion extends Model {}

SkincareSuggestion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    suggestion_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Product', 'Treatment']],
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'SkincareSuggestion',
    tableName: 'skincare_suggestions', 
    timestamps: false,
  }
);

module.exports = SkincareSuggestion;
