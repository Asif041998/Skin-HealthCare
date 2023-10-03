const Joi = require("joi");

const goalPostValidation = (data) => {
  const customStartDateValidation = (value, helpers) => {
    if (new Date(value) < new Date().setHours(0, 0, 0, 0)) {
      return helpers.error("date.min", { limit: new Date().setHours(0, 0, 0, 0) });
    }
    return value;
  };  

  const Schema = Joi.object({
    user_id: Joi.number().integer().required(),
    goal_type: Joi.number().required().valid(1, 2),
    purpose: Joi.string()
      .min(3)
      .max(50)
      .regex(/^[A-Za-z0-9][A-Za-z0-9\s\S]*$/)
      .trim()
      .messages({
        "string.base": "Purpose must be a string",
        "string.pattern.base":
          "Purpose can only contain a combination of alphabets and numbers",
      }),
    start_date: Joi.date().iso().custom(customStartDateValidation).messages({
      "date.base": "Start_date must be a date",
      "date.format": "Start_date must be in the format YYYY-MM-DD",
      "date.min": "Start_date cannot be in the past",
    }),
    reached_date: Joi.date()
      .iso()
      .min(Joi.ref('start_date'))
      .required()
      .messages({
        "date.base": "Reached_date must be a date",
        "date.format": "Reached_date must be in the format YYYY-MM-DD",
        "date.min": "Reached_date cannot be before the start date",
      }),
    prescriptions: Joi.array().items(Joi.number()).min(1).required(),
    treatments: Joi.array().items(Joi.number()).min(1).required(),
    products: Joi.array().items(Joi.number()).min(1).required(),
  });
  return Schema.validate(data);
};

module.exports = goalPostValidation;

