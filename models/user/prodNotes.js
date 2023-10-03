const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const Products = require("../../models/user/products")

const ProductNotes = sequelize.define("user_product_notes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  like_note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dislike_note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  freezeTableName: true
});

ProductNotes.belongsTo(Products, {
  foreignKey: "user_product_id",
  as: "products", // This should match the alias you used in the controller
});

module.exports = ProductNotes;
