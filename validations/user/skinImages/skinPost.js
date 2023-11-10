const Joi = require("joi");

const skinPostValidation = (data) => {
    const Schema = Joi.object({
        user_goal_id: Joi.number().integer().required(),
        image_date: Joi.date()
            .max('now')
            .required()
            .iso()
            .messages({
                "date.base": "image_date must be a date",
                "date.format": "image_date must be in the format YYYY-MM-DD",
                "date.min": "image_date cannot be a future date",
            }),
        image_url: Joi.string()
            .regex(/^(?![!@#$%^&*()_+{}\[\]:;<>,.?~\\\/]).*$/)
            .required()
            .trim()
            .messages({
                "string.base": "image_url must be a string",
                "string.pattern.base":
                    "image_url can only contain a combination of alphabets and numbers",
            }),
    });
    return Schema.validate(data);
};

module.exports = skinPostValidation;
