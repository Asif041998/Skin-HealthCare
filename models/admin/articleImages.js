const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const ArticleImages = sequelize.define('article_images', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    article_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
    { freezeTableName: true }
);

module.exports = ArticleImages;