const Joi = require("joi");

const skinCareRoutineProductPostValidation = (data) => {
    const Schema = Joi.object({
        user_skin_care_routine_id: Joi.number().integer().required(),
        user_product_id: Joi.number().integer().required(),
    });
    return Schema.validate(data);
};

module.exports = skinCareRoutineProductPostValidation;