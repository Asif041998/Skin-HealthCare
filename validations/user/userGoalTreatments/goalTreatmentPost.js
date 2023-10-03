const Joi = require("joi");

const goalTreatmentPostValidation = (data) => {
    const Schema = Joi.object({
        user_goal_id: Joi.number().integer().required(),
        user_facial_treatment_id: Joi.number().integer().required(),
    });
    return Schema.validate(data);
};

module.exports = goalTreatmentPostValidation;
