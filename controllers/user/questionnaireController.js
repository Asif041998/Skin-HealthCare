const Questionnaire = require('../../models/user/questionnaire');
const Question = require('../../models/user/survey_questions');
const Answer = require("../../models/user/survey_answers");
const ValidateId = require('../../services/exceptionHandling');
const { Op } = require('sequelize');
const { use } = require('../../routers/admin/collaborators');

// CREATE QUESTIONNAIRE
let survey_no;

exports.questionnaires = async (req, res) => {
    try {
        const surveyData = req.body.survey;

        const userDetails = await Questionnaire.findAll({ where: { user_id: surveyData[0].user_id } });

        if (userDetails.length === 0) {
            survey_no = 1;
        }
        else {
            survey_no = userDetails[userDetails.length - 1].survey_id + 1;
        }

        const savedSurveys = await Promise.all(surveyData.map(async (survey) => {
            const { user_id, question_id, answer_id, answer_text } = survey;

            const createdSurvey = await Questionnaire.create({
                user_id,
                question_id,
                answer_id,
                answer_text,
                survey_id: survey_no
            });

            return createdSurvey;
        }));
        return res.status(200).json({
            message: 'Questionnaires and Images uploaded successfully',
            data: {
                surveys: savedSurveys,
            },
        });
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};


exports.getAllQuestionnaires = async (req, res) => {
    try {
        let finalArray = [];
        let answerArray = [];
        let surveyObject, c = 0;
        const questionData = await Question.findAll();
        const answerData = await Answer.findAll();

        for (let i = 0; i < questionData.length; i++) {

            for (let j = c; j < answerData.length; j++) {
                let question_id = answerData[j].question_id;

                if (question_id === questionData[i].id) {
                    let answerDetails = {
                        answer_id: answerData[j].id,
                        answer_text: answerData[j].answer,
                        display_order: answerData[j].display_order
                    }
                    answerArray.push(answerDetails);

                    if (j === answerData.length - 1) {
                        surveyObject = {
                            question_id: questionData[i].id,
                            display_order: questionData[i].display_order,
                            question_text: questionData[i].question,
                            question_type: questionData[i].question_type,
                            answer_details: answerArray
                        }
                    }
                }
                else {
                    c = j;
                    surveyObject = {
                        question_id: questionData[i].id,
                        display_order: questionData[i].display_order,
                        question_text: questionData[i].question,
                        question_type: questionData[i].question_type,
                        answer_details: answerArray
                    }
                    answerArray = [];
                    break;
                }
            }

            finalArray.push(surveyObject);
        }
        return res.status(200).json({
            message: "Questionnaire details fetched successfully",
            data: finalArray
        })
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};


//GET ALL THE SURVEYS WITH ID AND DATE
exports.getAllSurveysAndDate = async (req, res) => {
    try {
        const userId = req.user.id;

        const usersDetails = await Questionnaire.findAll({ where: { user_id: userId }, attributes: ['survey_id', 'createdAt'] });
        if (usersDetails.length === 0)
            return res.status(200).json({ message: "No survey found with this user", data: [] });

        const uniqueSurveyIds = new Set();

        const surveyArray = usersDetails.reduce((result, survey) => {
            if (!uniqueSurveyIds.has(survey.survey_id)) {
                uniqueSurveyIds.add(survey.survey_id);
                result.push({
                    survey_id: survey.survey_id,
                    date: survey.createdAt
                });
            }
            return result;
        }, []);

        return res.status(200).json({
            message: "Survey details fetched successfully",
            data: surveyArray
        });
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};


// GET ALL THE SURVEYS BY ID
exports.getSurveysById = async (req, res) => {
    try {
        const surveyId = req.params.survey_id;
        const userId = req.user.id;

        const exceptionResult = await ValidateId(surveyId);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const surveyDetails = await Questionnaire.findAll({
            where: { user_id: userId, survey_id: surveyId },
            include: [
                {
                    model: Question,
                    as: 'question',
                    attributes: ['question'],
                },
                {
                    model: Answer,
                    as: 'answer',
                    attributes: ['answer'],
                },
            ],
        });

        if (surveyDetails.length === 0)
            return res.status(200).json({ message: "There is no survey with this id", data: { "Commitment": [] } });

        const filterByQuestionIds = (questionIds) =>
            surveyDetails.filter((detail) => questionIds.includes(detail.question_id));

        const Commitment = filterByQuestionIds([11, 12]);
        const fitzpatrickSkinTone = filterByQuestionIds([13]);
        const skinType = filterByQuestionIds([14]);
        const skinPhotos = filterByQuestionIds([15, 16, 17, 18, 19]);
        const waterIntake = filterByQuestionIds([20]);
        const Diet = filterByQuestionIds([21, 22, 23]);
        const Vitamins = filterByQuestionIds([24]);
        const Movement = filterByQuestionIds([29, 30]);
        const sleepHabits = filterByQuestionIds([25, 26, 27, 28]);
        const stressLevel = filterByQuestionIds([31, 32, 33]);
        const healthConcerns = filterByQuestionIds([34]);

        return res.status(200).json({
            message: "Survey details fetched successfully",
            data: {
                Commitment,
                fitzpatrickSkinTone,
                skinType,
                skinPhotos,
                waterIntake,
                Diet,
                Vitamins,
                Movement,
                sleepHabits,
                stressLevel,
                healthConcerns,
            },
        });
    } catch (err) {
        return res.status(400).json(err.message);
    }
};


// UPDATE THE QUESTIONNAIRE BY  SURVEY-ID 
exports.updateQuestionnaires = async (req, res) => {
    try {
        const userId = req.user.id;
        const surveyId = req.params.survey_id;
        const surveyData = req.body.survey;

        const exceptionResult = await ValidateId(surveyId);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const exist = await Questionnaire.findAll({ where: { user_id: userId, survey_id: surveyId } });
        if (exist.length === 0)
            return res.status(200).json({ message: "There is no survey with this id", data: { "Commitment": [] } });

        for (let i = 0; i < surveyData.length; i++) {
            let survey = surveyData[i];
            if (survey.answer_text) {
                await Questionnaire.update({ answer_text: survey.answer_text },
                    {
                        where: {
                            question_id: survey.question_id,
                            answer_id: survey.answer_id,
                            survey_id: surveyId,
                            user_id: userId
                        }
                    }
                );
            }
            else {
                await Questionnaire.update(survey, {
                    where: {
                        question_id: survey.question_id,
                        survey_id: surveyId,
                        user_id: userId
                    }
                });
            }
        }

        updatedSurveys = await Questionnaire.findAll({
            where: {
                user_id: userId,
                survey_id: surveyId,
            },
        });

        return res.status(200).json({
            message: "Survey details updated successfully",
            data: updatedSurveys,
        });
    } catch (err) {
        return res.status(400).json(err.message);
    }
};
