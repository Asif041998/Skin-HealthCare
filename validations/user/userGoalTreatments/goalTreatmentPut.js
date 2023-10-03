const Joi = require("joi");

const goalTreatmentPutValidation = (data) => {
    const Schema = Joi.object({
        user_goal_id: Joi.number().integer(),
        user_facial_treatment_id: Joi.number().integer(),
    });
    return Schema.validate(data);
};

module.exports = goalTreatmentPutValidation;
