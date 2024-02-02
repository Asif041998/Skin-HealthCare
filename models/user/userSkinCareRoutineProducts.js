const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const Products = require('../../models/user/products');

const userSkinCareRoutineProducts = sequelize.define("user_skin_care_routine_products", {
  user_skin_care_routine_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  user_product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
}, {
  freezeTableName: true
});

userSkinCareRoutineProducts.belongsTo(Products, {
  foreignKey: 'user_product_id',
  as: 'product'
});

module.exports = userSkinCareRoutineProducts;
