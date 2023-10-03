const Joi = require("joi");

const routinePutValidation = (data) => {
  const Schema = Joi.object({
    user_id: Joi.number().integer(),
    timeframe: Joi.string()
      .min(5)
      .regex(/^[A-Za-z][A-Za-z0-9\s.,''""()\S]*$/)
      .trim()
      .messages({
        "string.base": "Timeframe must be a string",
        "string.pattern.base":
          "Timeframe can only contain a combination of alphabets and numbers",
      }),
    products: Joi.array().items(Joi.number()).min(1),
    treatments: Joi.array().items(Joi.number()).min(1),
  });
  return Schema.validate(data);
};

module.exports = routinePutValidation;
