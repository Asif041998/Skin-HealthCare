
const Joi = require("joi");

const notificationsPostValidation = (data) => {
    const Schema = Joi.object({
        type: Joi.string()
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.base": "Type must be a string",
                "string.pattern.base":
                    "Type can only contain a combination of alphabets, numbers and special characters",
            }),
            title: Joi.string().min(3)
            .max(50)
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.empty" : "Please enter the Title",
                "string.base": "Title must be a string",
                "string.pattern.base":
                    "Title can only contain a combination of alphabets, numbers and special characters",
            }),
            description: Joi.string()
            .min(5)
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.empty" : "Please enter the Description",
                "string.base": "Description must be a string",
                "string.pattern.base":
                    "Description can only contain a combination of alphabets, numbers and special characters",
            }),
            is_read: Joi.number().integer()
            .valid(0, 1)
            .default(0)
            .required()
            .messages({
              'number.base': 'is_read must be a number',
              'number.only': 'is_read must be either 0 or 1',
              'any.required': 'is_read is required',
            })
    });
    return Schema.validate(data);
};

module.exports = notificationsPostValidation;
