const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');
const SkincareSuggestion = require('../../models/admin/skincareSuggestion');

const ArticleRoutine = sequelize.define('article_skincare_routines', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    routine_type: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    article_id: {
        type: DataTypes.INTEGER,
        allowNull:  true
    },
    skincare_suggestion_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
},
    { freezeTableName: true }
);

ArticleRoutine.belongsTo(SkincareSuggestion, {
    foreignKey: 'skincare_suggestion_id',
    as: 'skincareSuggestion',
    onDelete: 'CASCADE', // Add this line to set CASCADE on delete
    onUpdate: 'CASCADE', // Add this line to set CASCADE on update
  });

module.exports = ArticleRoutine;