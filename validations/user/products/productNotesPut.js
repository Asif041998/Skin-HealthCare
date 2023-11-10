const Joi = require("joi");

const productNotesPutValidation = (data) => {
  const Schema = Joi.object({
    like_note: Joi.string()
      .min(3)
      .max(500)
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.empty" : "Please enter What I like",
        "string.base": "What I like must be a string",
        "string.pattern.base":
          "What I like can only contain a combination of alphabets and numbers",
      }),
    dislike_note: Joi.string()
      .min(5)
      .max(500)
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.empty" : "Please enter What I Don't Like",
        "string.base": "What I Don't Like must be a string",
        "string.pattern.base":
          "What I Don't Like can only contain a combination of alphabets and numbers",
      }),
    user_product_id: Joi.number().integer()
    .messages({
        "number.base": "user_product_id must be a valid number",
        "any.required": "user_product_id is required",
      }),
  });
  return Schema.validate(data);
};

module.exports = productNotesPutValidation;
