const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const survey_answers = sequelize.define('survey_question_answers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_active: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    display_order: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
    {
        freezeTableName: true
    });

module.exports = survey_answers;