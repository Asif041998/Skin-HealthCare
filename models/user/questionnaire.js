const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');
const Question = require('../../models/user/survey_questions');
const Answer = require('../../models/user/survey_answers');

const Questionnaire = sequelize.define('user_survey_response', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    answer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    answer_text: {
        type: DataTypes.STRING,
        allowNull: true
    },
    survey_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},
    {
        freezeTableName: true
    });

Questionnaire.belongsTo(Question, {
    foreignKey: 'question_id',
    as: 'question'
});

Questionnaire.belongsTo(Answer, {
    foreignKey: 'answer_id',
    as: 'answer'
});

module.exports = Questionnaire;