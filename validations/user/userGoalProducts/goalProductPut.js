const Joi = require("joi");

const goalProductPutValidation = (data) => {
    const Schema = Joi.object({
        user_goal_id: Joi.number().integer(),
        user_product_id: Joi.number().integer(),
    });
    return Schema.validate(data);
};

module.exports = goalProductPutValidation;
