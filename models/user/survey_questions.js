const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const survey_questions = sequelize.define('survey_questions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    survey_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    question_type: {
        type: DataTypes.STRING,
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

module.exports = survey_questions;