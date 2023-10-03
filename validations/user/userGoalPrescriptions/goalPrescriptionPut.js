const Joi = require("joi");

const goalPrescriptionPutValidation = (data) => {
    const Schema = Joi.object({
        user_goal_id: Joi.number().integer(),
        user_prescription_id: Joi.number().integer(),
    });
    return Schema.validate(data);
};

module.exports = goalPrescriptionPutValidation;
