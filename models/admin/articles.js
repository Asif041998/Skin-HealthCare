const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');
const ArticleRoutine = require('../../models/admin/articleRoutine');
const ArticleImage = require('../../models/admin/articleImages');
const ArticleVideo = require('../../models/admin/articleVideos');

const Article = sequelize.define('articles', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  article_content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  article_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  screen_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  screen_image_title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, { freezeTableName: true });

Article.hasMany(ArticleRoutine, { foreignKey: 'article_id' });
Article.hasOne(ArticleVideo, { foreignKey: 'article_id' });
Article.hasMany(ArticleImage, { foreignKey: 'article_id'});

module.exports = Article;