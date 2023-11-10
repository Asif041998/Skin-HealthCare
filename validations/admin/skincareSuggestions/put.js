const Joi = require("joi");

const skincareSuggestionPutValidations = (data) => {
  const Schema = Joi.object({
    name: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.base": "Name must be a string",
        "string.pattern.base":
          "Name can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character",
      }),
    image_url: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Image URL must be a string",
        "string.pattern.base":
          "Image URL can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character",
      }),
    suggestion_type: Joi.string().valid("Product", "Treatment").required(),
    price: Joi.number().when("suggestion_type", {
      is: "Product",
      then: Joi.number().optional(),
      otherwise: Joi.number().optional(),
    }),
    description: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.base": "Description must be a string",
        "string.pattern.base":
          "Description can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character",
      }),
    quantity: Joi.number().when("suggestion_type", {
      is: "Product",
      then: Joi.number().optional(),
      otherwise: Joi.number().optional(),
    }),
  });
  return Schema.validate(data);
};

module.exports = skincareSuggestionPutValidations;
