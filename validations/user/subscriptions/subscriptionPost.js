const Joi = require("joi");

const subscriptionPostValidation = (data) => {
    const currentDate = new Date().toISOString().split('T')[0];

    const Schema = Joi.object({
        user_id: Joi.number().integer().required(),
        subscription_id: Joi.number().integer().required(),
        start_date: Joi.date()
            .iso()
            .required()
            .messages({
                "date.base": "Start_date must be a date",
                "date.format": "Start_date must be in the format YYYY-MM-DD",
                "date.equal": `Start_date must be the current date (${currentDate})`,
            }),
        end_date: Joi.date()
            .iso()
            .min(Joi.ref('start_date'))
            .messages({
                "date.base": "End Date must be a date",
                "date.format": "End Date must be in the format YYYY-MM-DD",
                "date.min": "End Date cannot be before the start date",
            }),
        order_id: Joi.string()
            .trim()
            .messages({
                "string.base": "Order id must be a string",
                "string.empty": "Please enter the Order id",
            }),
        purchase_time: Joi.string()
            .trim()
            .messages({
                "string.base": "Purchase time must be a string",
                "string.empty": "Please enter the purchase time",
            }),
        status: Joi.string()
            .valid('active', 'closed')
            .trim()
            .required()
            .messages({
                "string.base": "Status must be a string",
                "string.empty": "Please enter the status",
            }),
        platform: Joi.string()
            .valid('Android', 'iOS')
            .trim()
            .required()
            .messages({
                "string.base": "Platform must be a string",
                "string.empty": "Please enter the platform",
            }),
        response_data: Joi.object()
    });

    return Schema.validate(data);
};

module.exports = subscriptionPostValidation;



