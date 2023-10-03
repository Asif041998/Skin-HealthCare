const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const Product_type = require('../../models/user/productTypes');

const Products = sequelize.define("user_products", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true ,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  purchase_location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  open_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  product_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  expiration_date: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  freezeTableName: true
});

Products.belongsTo(Product_type, {
  foreignKey: "product_type_id",
  as: "product_type", 
});

module.exports = Products;
