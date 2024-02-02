const Joi = require("joi");

const prescriptionsPutValidation = (data) => {
  const Schema = Joi.object({
    user_id: Joi.number().integer(),
    provider: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Provider name must be a string",
        "string.pattern.base":
          "Provider name can only contain a combination of alphabets and numbers",
      }),
    reason: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Reason for visit must be a string",
        "string.pattern.base":
          "Reason for visit can only contain a combination of alphabets and numbers",
        "string.empty": "Please enter the reason for visit",
      }),
    diagnosis: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Diagnosis must be a string",
        "string.pattern.base":
          "Diagnosis can only contain a combination of alphabets and numbers",
      }),
    visit_date: Joi.date().max("now").iso().messages({
      "date.base": "Visit_date must be a date",
      "date.format": "Visit_date must be in the format YYYY-MM-DD",
      "date.max": "Visit_date cannot be a future date",
      "date.empty": "Please enter the Date"
    }),
    status: Joi.string().valid("current", "past").messages({
      "string.base": "Status must be a string",
    }),
  });
  return Schema.validate(data);
};

module.exports = prescriptionsPutValidation;
