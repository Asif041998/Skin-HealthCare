const Joi = require("joi");

const goalPrescriptionPostValidation = (data) => {
    const Schema = Joi.object({
        user_goal_id: Joi.number().integer().required(),
        user_prescription_id: Joi.number().integer().required(),
    });
    return Schema.validate(data);
};

module.exports = goalPrescriptionPostValidation;
