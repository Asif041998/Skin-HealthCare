const Joi = require("joi");

const goalPostValidation = (data) => {

  const Schema = Joi.object({
    user_id: Joi.number().integer().required(),
    goal_type: Joi.number().required().valid(1, 2),
    purpose: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Skin concern name must be a string",
        "string.pattern.base":
          "Skin concern name can only contain a combination of alphabets and numbers",
        "string.empty": "Please enter the skin concern name"
      }),
    start_date: Joi.date().iso().messages({
      "date.base": "Start_date must be a date",
      "date.format": "Start_date must be in the format YYYY-MM-DD",
      "date.min": "Start_date cannot be in the past",
    }),
    reached_date: Joi.date()
      .iso()
      .min(Joi.ref('start_date'))
      .messages({
        "date.base": "Reached Date must be a date",
        "date.format": "Reached Date must be in the format YYYY-MM-DD",
        "date.min": "Reached Date cannot be before the start date",
      }),
    prescriptions: Joi.array().items(Joi.number()),
    treatments: Joi.array().items(Joi.number()),
    products: Joi.array().items(Joi.number()),
  });
  return Schema.validate(data);
};

module.exports = goalPostValidation;
