const Joi = require("joi");

const treatmentPostValidation = (data) => {
    const Schema = Joi.object({
        user_id: Joi.number().integer().required(),
        name: Joi.string().min(3)
            .max(50)
            .regex(/^[A-Za-z][A-Za-z\s\-.,'""']+$/)
            .required()
            .trim()
            .messages({
                "string.base": "Name must be a string",
                "string.pattern.base":
                    "Name can only contain a combination of alphabets and numbers",
            }),
        description: Joi.string()
            .min(5)
            .regex(/^[A-Za-z][A-Za-z0-9\s.,''""()\S]*$/)
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
