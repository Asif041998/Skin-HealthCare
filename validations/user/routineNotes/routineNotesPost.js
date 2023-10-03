const Joi = require("joi");

const routineNotesPostValidation = (data) => {
  const Schema = Joi.object({
    user_skin_care_routine_id: Joi.number().integer().required(),
    date: Joi.date().iso()
    .messages({
        "date.base": "Date must be a date",
        "date.format": "Date must be in the format YYYY-MM-DD",
      }),
    description: Joi.string()
    .min(5)
      .regex(/^[A-Za-z][A-Za-z0-9\s.,''""()\S]*$/)
      .trim()
      .messages({
        "string.base": "Description must be a string",
        "string.pattern.base":
          "Description can only contain a combination of alphabets and numbers",
      }),
  });

  return Schema.validate(data);
};

module.exports = routineNotesPostValidation;
