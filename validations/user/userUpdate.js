
const Joi = require("joi");

const userPutValidation = (data) => {
    const Schema = Joi.object({
        firstname: Joi.string().min(3).max(30)
    .trim()
    .regex(/^[A-Za-z\s\-.,''""']+$/)
            .messages({
                "string.base": "Firstname must be a string",
                "string.pattern.base":
                    "Firstname can only contain alphabets"
            }),
    lastname: Joi.string().min(3).max(30)
    .trim()
    .regex(/^[A-Za-z\s\-.,''""']+$/)
            .messages({
                "string.base": "Lastname must be a string",
                "string.pattern.base":
                    "Lastname can only contain alphabets"
            }),
        state: Joi.number().max(51),
        birth_year: Joi.number(),
        race_id: Joi.number().max(12),
    });
    return Schema.validate(data);
};

module.exports = userPutValidation;
