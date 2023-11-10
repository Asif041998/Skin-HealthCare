const Joi = require('joi');

const treatmentPutValidation = (data) => {
    const Schema = Joi.object({
        user_id: Joi.number().integer(),
        name: Joi.string().min(3)
            .max(50)
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.empty" : "Please enter a Treatment Name",
                "string.base": "Treatment Name must be a string",
                "string.pattern.base":
                    "Treatment Name can only contain alphabets ",
            }),
        description: Joi.string()
            .min(5)
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

module.exports = treatmentPutValidation;
