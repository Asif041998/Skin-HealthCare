const Joi = require("joi");

const routineNotesPostValidation = (data) => {
  const Schema = Joi.object({
    user_id: Joi.number().integer().required(),
    date: Joi.date().iso()
    .messages({
        "date.base": "Date must be in the format YYYY-MM-DD",
        "date.format": "Date must be in the format YYYY-MM-DD",
      }),
    description: Joi.string()
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

module.exports = routineNotesPostValidation;
