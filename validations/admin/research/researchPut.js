const Joi = require("joi");

const researchValidationsPut = (data) => {
  const Schema = Joi.object({
    title: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.base": "Title must be a string",
        "string.pattern.base":
          "Title can only contain combination of alphabets and numbers",
      }),
    description: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.base": "Description must be a string",
        "string.pattern.base":
          "Description can only contain combination of alphabets and numbers",
      }),
    impact: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.base": "Making an Impact must be a string",
      }),
    works: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.base": "How it works must be a string",
      })
  });
  return Schema.validate(data);
};

module.exports = researchValidationsPut;
