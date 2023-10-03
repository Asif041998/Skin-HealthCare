
const Joi = require("joi");

const prescriptionsPostValidation = (data) => {
    const Schema = Joi.object({
        user_id: Joi.number().integer().required(),
        provider: Joi.string().min(3)
            .max(50)
            .regex(/^[A-Za-z\s\-.,''""']+$/)
            .required()
            .trim()
            .messages({
                "string.base": "Provider name must be a string",
                "string.pattern.base":
                    "Provider name can only contain alphabets",
            }),
        reason: Joi.string().min(3)
            .max(50)
            .regex(/^[A-Za-z][A-Za-z\s\-,.''""'()]+$/)
            .trim()
            .messages({
                "string.base": "Reason must be a string",
                "string.pattern.base":
                    "Reason can only contain a combination of alphabets and numbers",
            }),
        diagnosis: Joi.string()
            .min(5)
            .regex(/^[A-Za-z][A-Za-z\s\-.,''""()']+$/)
            .trim()
            .messages({
                "string.base": "Diagnosis must be a string",
                "string.pattern.base":
                    "Diagnosis can only contain a combination of alphabets and numbers",
            }),
            visit_date: Joi.date()
            .max('now') 
            .iso() 
            .required()
            .messages({
                "date.base": "Visit_date must be a date",
                "date.format": "Visit_date must be in the format YYYY-MM-DD",
                "date.max": "Visit_date cannot be a future date",
            }),
    });
    return Schema.validate(data);
};

module.exports = prescriptionsPostValidation;
