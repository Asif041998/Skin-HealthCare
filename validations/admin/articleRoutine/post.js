const Joi = require("joi");

const articleRoutinePostValidations = (data) => {
  const Schema = Joi.object({
    routine_type: Joi.string()
      .trim()
      .required()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.base": "Name must be a string",
        "string.pattern.base":
          "Name can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character",
      }),
    article_id: Joi.number().integer(),
    skincare_suggestion_id: Joi.number().integer(),
  });
  return Schema.validate(data);
};

module.exports = articleRoutinePostValidations;
