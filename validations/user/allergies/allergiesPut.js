const Joi = require("joi");

const allergiesPutValidation = (data) => {
  const Schema = Joi.object({
    user_id: Joi.number().integer(),
    allergen: Joi.string()
      .min(3)
      .max(50)
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Allergen must be a string",
        "string.pattern.base":
          "Allergen can only contain alphabets, numbers and special characters",
        "string.empty": "Please enter the Ingredient name",
      }),
    allergic_reaction: Joi.string()
      .min(3)
      .max(50)
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Allergic reaction must be a string",
        "string.pattern.base":
          "Allergic reaction can only contain a combination of alphabets, numbers and special characters",
        "string.empty": "Please enter What happens?",
      }),
    healing_methods: Joi.string()
      .min(5)
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Healing methods must be a string",
        "string.pattern.base":
          "Healing methods can only contain a combination of alphabets, numbers and special characters",
        "string.empty": "Please enter What heals or calms the reaction?",
      }),
  });
  return Schema.validate(data);
};

module.exports = allergiesPutValidation;
