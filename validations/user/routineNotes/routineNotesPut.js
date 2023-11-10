const Joi = require("joi");

const routineNotesPutValidation = (data) => {
  const Schema = Joi.object({
    user_id: Joi.number().integer(),
    date: Joi.date().iso()
      .messages({
        "date.base": "Date must be in the format YYYY-MM-DD",
        "date.format": "Date must be in the format YYYY-MM-DD",
      }),
    description: Joi.string()
    .min(5)
    .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Comment must be a string",
        "string.pattern.base":
          "Comment can only contain a combination of alphabets and numbers",
      }),
  });

  return Schema.validate(data);
};

module.exports = routineNotesPutValidation;
