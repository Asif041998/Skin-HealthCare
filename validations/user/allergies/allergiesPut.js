
const Joi = require("joi");

const allergiesPutValidation = (data) => {
    const Schema = Joi.object({
        user_id: Joi.number().integer(),
        allergen: Joi.string().min(3)
            .max(50)
            .regex(/^[A-Za-z\s\-.,''""']+$/)
            .trim()
            .messages({
                "string.base": "Allergen must be a string",
                "string.pattern.base":
                    "Allergen can only contain alphabets",
            }),
            allergic_reaction: Joi.string().min(3)
            .max(50)
            .regex(/^[A-Za-z0-9][A-Za-z0-9\s\S]*$/)
            .trim()
            .messages({
                "string.base": "Allergic reaction must be a string",
                "string.pattern.base":
                    "Allergic reaction can only contain a combination of alphabets and numbers",
            }),
            healing_methods: Joi.string()
            .min(5)
            .regex(/^[A-Za-z0-9][A-Za-z0-9\s\S]*$/)
            .trim()
            .messages({
                "string.base": "Healing methods must be a string",
                "string.pattern.base":
                    "Healing methods can only contain a combination of alphabets and numbers",
            }),
    });
    return Schema.validate(data);
};

module.exports = allergiesPutValidation;
