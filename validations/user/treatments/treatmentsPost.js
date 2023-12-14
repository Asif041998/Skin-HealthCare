const Joi = require("joi");

const treatmentPostValidation = (data) => {
    const Schema = Joi.object({
        user_id: Joi.number().integer().required(),
        name: Joi.string()
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .required()
            .trim()
            .messages({
                "string.empty" : "Please enter the Treatment Name",
                "string.base": "Treatment Name must be a string",
                "string.pattern.base":
                    "Treatment Name can only contain a combination of alphabets and numbers",
            }),
        description: Joi.string()
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.base": "Description must be a string",
                "string.pattern.base":
                    "Description can only contain a combination of alphabets and numbers",
            }),
    });
    return Schema.validate(data);
};


module.exports = treatmentPostValidation;
