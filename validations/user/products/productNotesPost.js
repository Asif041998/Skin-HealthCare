const Joi = require("joi");

const productNotesPostValidation = (data) => {
  const Schema = Joi.object({
    like_note: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.empty" : "Please enter What I Like",
        "string.base": "What I Like must be a string",
        "string.pattern.base":
          "What I Like can only contain a combination of alphabets and numbers",
      }),
    dislike_note: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.empty" : "Please enter What Don't I Like",
        "string.base": "What Don't I Like must be a string",
        "string.pattern.base":
          "What Don't I Like can only contain a combination of alphabets and numbers",
      }),
    user_product_id: Joi.number().integer().required()
    .messages({
        "number.base": "user_product_id must be a valid number",
        "any.required": "user_product_id is required",
      }),
  });
  return Schema.validate(data);
};

module.exports = productNotesPostValidation;