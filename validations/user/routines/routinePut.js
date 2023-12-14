const Joi = require("joi");

const routinePutValidation = (data) => {
  const Schema = Joi.object({
    user_id: Joi.number().integer(),
    timeframe: Joi.string()
      .regex(/^[A-Za-z][A-Za-z0-9\s.,''""()\S]*$/)
      .trim()
      .messages({
        "string.base": "Please choose the Timeframe",
        "string.pattern.base":
          "Please choose the Timeframe",
      }),
    products: Joi.array().items(Joi.number()),
    treatments: Joi.array().items(Joi.number()),
  });
  return Schema.validate(data);
};

module.exports = routinePutValidation;
