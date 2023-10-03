const Joi = require("joi");

const skinPostValidation = (data) => {
    const Schema = Joi.object({
        user_id: Joi.number().integer().required(),
        date: Joi.date()
            .max('now')
            .required()
            .iso()
            .messages({
                "date.base": "Date must be a date",
                "date.format": "Date must be in the format YYYY-MM-DD",
                "date.min": "Date cannot be a future date",
            }),
        file_name: Joi.string()
            .regex(/^(?![!@#$%^&*()_+{}\[\]:;<>,.?~\\\/]).*$/)
            .required()
            .trim()
            .messages({
                "string.base": "File name must be a string",
                "string.pattern.base":
                    "File name can only contain a combination of alphabets and numbers",
            }),
        goal_type: Joi.number()
            .valid(1, 2)
            .integer()
            .required()
    });
    return Schema.validate(data);
};

module.exports = skinPostValidation;
