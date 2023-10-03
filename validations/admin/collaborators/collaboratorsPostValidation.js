const Joi = require("joi");

const collaboratorPostValidation = (data) => {

    const Schema = Joi.object({
        title: Joi.string()
            .required()
            .trim()
            .regex(/^(?=.*[A-Za-z])[A-Za-z0-9\s.,?''":;( )\[\]{}]+$/)
            .messages({
                "string.base": "Title must be a string",
                "string.pattern.base":
                    "Title can only contain combination of alphabets and numbers",
            }),
        join_year: Joi.string()
            .min(4)
            .max(4)
            .required()
            .regex(/^\d{4}$/)
            .trim()
            .messages({
                "string.base": "join_year must be a year",
                "string.pattern.base":
                    "join_year can only contain numbers",
            }),
        about: Joi.string()
            .regex(/^(?![^A-Za-z0-9]).*$/)
            .trim()
            .required()
            .messages({
                "string.base": "About must be a string",
                "string.pattern.base":
                    "About can only contain alphabets and numbers",
            }),
        participation_reason: Joi.string()
            .regex(/^(?![^A-Za-z0-9]).*$/)
            .trim()
            .required()
            .messages({
                "string.base": "participation_reason must be a string",
                "string.pattern.base":
                    "participation_reason can only contain alphabets and numbers",
            }),
        learning_outcome: Joi.string()
            .regex(/^(?![^A-Za-z0-9]).*$/)
            .trim()
            .required()
            .messages({
                "string.base": "learning_outcome must be a string",
                "string.pattern.base":
                    "learning_outcome can only contain alphabets and numbers",
            }),
        video_url: Joi.string()
            .trim()
            .required()
            .required()
            .messages({
                "string.base": "Video URL must be a string",
            }),
        web_url: Joi.string()
            .trim()
            .required()
            .messages({
                "string.base": "Web URL must be a string",
            }),
        image_url: Joi.string()
            .trim()
            .required()
            .messages({
                "string.base": "Image URL must be a string",
            }),
    });
    return Schema.validate(data);
};

module.exports = collaboratorPostValidation;

