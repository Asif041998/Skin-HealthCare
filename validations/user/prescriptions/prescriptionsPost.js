const Joi = require("joi");

const prescriptionsPostValidation = (data) => {
  const Schema = Joi.object({
    user_id: Joi.number().integer().required(),
    provider: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Provider name must be a string",
        "string.pattern.base": "Provider name can only contain alphabets",
      }),
    reason: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Reason must be a string",
        "string.pattern.base":
          "Reason can only contain a combination of alphabets and numbers",
          "string.empty": "Please enter the Reason for Visit",
      }),
    diagnosis: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Diagnosis must be a string",
        "string.pattern.base":
          "Diagnosis can only contain a combination of alphabets and numbers",
      }),
    visit_date: Joi.date().max("now").iso().required().messages({
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

module.exports = prescriptionsPostValidation;
