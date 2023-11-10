const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');
const Article = require('../../models/admin/articles');

const ArticleVideo = sequelize.define('article_videos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    article_id : { 
        type: DataTypes.STRING,
        allowNull: true
    },
    video_title: {
        type: DataTypes.STRING,
        allowNull:  false
    },
    thumbnail_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    video_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
},
    { freezeTableName: true }
);

module.exports = ArticleVideo;