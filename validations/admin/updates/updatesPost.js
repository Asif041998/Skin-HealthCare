const Joi = require("joi");

const updatesValidationsPost = (data) => {
    const currentDateTime = new Date();
    currentDateTime.setUTCHours(0, 0, 0, 0);
    const Schema = Joi.object({
        os_type: Joi.string()
            .valid('Android', 'IOS', 'Both')
            .messages({
                "string.base": "os_type must be a string",
            })
            .required(),
        version: Joi.string()
            .trim()
            .regex(/^[0-9]+\.[0-9.]+$/)
            .messages({
                "string.base": "Version must be a string",
                "string.pattern.base":
                    "version can only contain a combination of dots and numbers",
            }),
        date: Joi.date()
            .min(currentDateTime)
            .iso()
            .required()
            .messages({
                "date.base": "It must be a date",
                "date.format": "It must be in the format YYYY-MM-DD",
            })
    });
    return Schema.validate(data);
};

module.exports = updatesValidationsPost;
