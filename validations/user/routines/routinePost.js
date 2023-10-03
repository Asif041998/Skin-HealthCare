const Joi = require("joi");

const routinePostValidation = (data) => {
  const Schema = Joi.object({
    user_id: Joi.number().integer().required(),
    timeframe: Joi.string()
      .min(5)
      .regex(/^[A-Za-z][A-Za-z0-9\s.,''""()\S]*$/)
      .trim()
      .messages({
        "string.base": "Timeframe must be a string",
        "string.pattern.base":
          "Timeframe can only contain a combination of alphabets and numbers",
      }),
    products: Joi.array().items(Joi.number()).min(1).required(),
    treatments: Joi.array().items(Joi.number()).min(1).required(),
  });

  return Schema.validate(data);
};

module.exports = routinePostValidation;
