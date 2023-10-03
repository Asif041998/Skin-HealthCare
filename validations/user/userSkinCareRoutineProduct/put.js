const Joi = require("joi");

const skinCareRoutineProductPutValidation = (data) => {
    const Schema = Joi.object({
        user_skin_care_routine_id: Joi.number().integer(),
        user_product_id: Joi.number().integer(),
    });
    return Schema.validate(data);
};

module.exports = skinCareRoutineProductPutValidation;