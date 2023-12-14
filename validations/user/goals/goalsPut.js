const Joi = require("joi");

const goalPutValidation = (data) => {
  const customStartDateValidation = (value, helpers) => {
    if (new Date(value) < new Date().setHours(0, 0, 0, 0)) {
      return helpers.error("date.min", { limit: new Date().setHours(0, 0, 0, 0) });
    }
    return value;
  };  

  const Schema = Joi.object({
    user_id: Joi.number().integer(),
    goal_type: Joi.number().valid(1, 2),
    purpose: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Skin Concern Name must be a string",
        "string.pattern.base":
          "Skin Concern Name can only contain a combination of alphabets and numbers",
          "string.empty": "Please enter the Skin Concern Name",
      }),
    start_date: Joi.date().iso().messages({
      "date.base": "Start Date must be a date",
      "date.format": "Start Date must be in the format YYYY-MM-DD",
      "date.empty" : "Please enter the Start Date",
    }),
    reached_date: Joi.date()
      .iso()
      .min(Joi.ref('start_date'))
      .messages({
        "date.base": "Reached_date must be a date",
        "date.format": "Reached_date must be in the format YYYY-MM-DD",
        "date.min": "Reached_date cannot be before the start date",
      }),
    prescriptions: Joi.array().items(Joi.number()),
    treatments: Joi.array().items(Joi.number()),
    products: Joi.array().items(Joi.number()),
  });
  return Schema.validate(data);
};

module.exports = goalPutValidation;

