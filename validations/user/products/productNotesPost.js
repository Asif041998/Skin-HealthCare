const Joi = require("joi");

const productNotesPostValidation = (data) => {
  const Schema = Joi.object({
    like_note: Joi.string()
      .min(3)
      .max(500)
      .regex(/^[A-Za-z][A-Za-z\s\-.,'""']+$/)
      .trim()
      .messages({
        "string.base": "like_note must be a string",
        "string.pattern.base":
          "like_note can only contain a combination of alphabets and numbers",
      }),
    dislike_note: Joi.string()
      .min(5)
      .max(500)
      .regex(/^[A-Za-z][A-Za-z0-9\s.,''""()\S]*$/)
      .trim()
      .messages({
        "string.base": "dislike_note must be a string",
        "string.pattern.base":
          "dislike_note can only contain a combination of alphabets and numbers",
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