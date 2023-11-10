
const Joi = require("joi");

const userPutValidation = (data) => {
    const Schema = Joi.object({
        firstname: Joi.string().min(3).max(30)
    .trim()
    .regex(/^[A-Za-z\s\-.,''""']+$/)
            .messages({
                "string.empty" : "Please enter the First Name",
                "string.base": "First Name must be a string",
                "string.pattern.base":
                    "First Name can only contain alphabets"
            }),
    lastname: Joi.string().min(3).max(30)
    .trim()
    .regex(/^[A-Za-z\s\-.,''""']+$/)
            .messages({
                "string.empty" : "Please enter the Last Name",
                "string.base": "Last Name must be a string",
                "string.pattern.base":
                    "Last Name can only contain alphabets"
            }),
        state: Joi.number().max(51),
        birth_year: Joi.number(),
        race_id: Joi.number().max(12),
    });
    return Schema.validate(data);
};

module.exports = userPutValidation;
