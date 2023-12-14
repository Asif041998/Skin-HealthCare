const Joi = require("joi");

const researchValidationsPut = (data) => {
  const Schema = Joi.object({
    healthAndSafety: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.empty": "Please enter the Advocating for our Health & Safety",
        "string.base": "Advocating for our Health & Safety must be a string",
        "string.pattern.base":
          "Title can only contain combination of alphabets and numbers",
      }),
    impact: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.empty": "Please enter Making an Impact",
        "string.base": "Making an Impact must be a string",
      }),
    joinIn: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.empty": "Please enter Want to Join In?",
        "string.base": "Want to Join In must be a string",
      }),
  });
  return Schema.validate(data);
};

module.exports = researchValidationsPut;
