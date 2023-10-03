const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const Product = require('../../models/user/products');
const Product_type = require('../../models/user/productTypes');

const GoalsProducts = sequelize.define("user_goal_products", {
  user_goal_id: {
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

GoalsProducts.belongsTo(Product,{
  foreignKey: 'user_product_id',
  as: 'product'
});

// GoalsProducts.belongsTo(Product_type, {
//   foreignKey: "product_type_id",
//   as: "product_type", 
// });

module.exports = GoalsProducts;
