const Joi = require("joi");

const skinTrackerPutValidation = (data) => {
    const Schema = Joi.object({
        user_id: Joi.number().integer(),
        image_date: Joi.date()
            .max('now')
            .iso()
            .messages({
                "date.base": "Date must be a date",
                "date.format": "Date must be in the format YYYY-MM-DD",
                "date.min": "Date cannot be a future date",
            }),
        file_name: Joi.string()
            .regex(/^(?![!@#$%^&*()_+{}\[\]:;<>,.?~\\\/]).*$/)
            .trim()
            .messages({
                "string.base": "File name must be a string",
                "string.pattern.base":
                    "File name can only contain a combination of alphabets and numbers",
            }),
    });
    return Schema.validate(data);
};

module.exports = skinTrackerPutValidation;
