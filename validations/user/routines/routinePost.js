const Joi = require("joi");

const routinePostValidation = (data) => {
  const Schema = Joi.object({
    user_id: Joi.number().integer().required(),
    timeframe: Joi.string()
      .min(5)
      .regex(/^[A-Za-z][A-Za-z0-9\s.,''""()\S]*$/)
      .trim()
      .messages({
        "string.base": "Please choose the Timeframe",
        "string.pattern.base":
          "Please choose the Timeframe",
      }),
    products: Joi.array().items(Joi.number()).required(),
    treatments: Joi.array().items(Joi.number()),
  });

  return Schema.validate(data);
};

module.exports = routinePostValidation;
