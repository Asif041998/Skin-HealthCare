const Joi = require("joi");

const goalProductPostValidation = (data) => {
    const Schema = Joi.object({
        user_goal_id: Joi.number().integer().required(),
        user_product_id: Joi.number().integer().required(),
    });
    return Schema.validate(data);
};

module.exports = goalProductPostValidation;
