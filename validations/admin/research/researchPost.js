const Joi = require("joi");

const researchValidationsPost = (data) => {
  const Schema = Joi.object({
    title: Joi.string()
      .trim()
      .regex(/^(?=.*[A-Za-z])[A-Za-z0-9\s.,?''":;( )\[\]{}]+$/)
      .messages({
        "string.base": "Title must be a string",
        "string.pattern.base":
          "Title can only contain combination of alphabets and numbers",
      })
      .required(),
    description: Joi.string()
      .trim()
      .regex(/^[A-Za-z0-9][A-Za-z0-9\s\S]*$/)
      .messages({
        "string.base": "Description must be a string",
        "string.pattern.base":
          "Description can only contain combination of alphabets and numbers",
      }),
    impact: Joi.string()
      .trim()
      .regex(/^[A-Za-z0-9][A-Za-z0-9\s\S]*$/)
      .messages({
        "string.base": "Making an Impact must be a string",
      })
      .required(),
    works: Joi.string()
      .trim()
      .regex(/^[A-Za-z0-9][A-Za-z0-9\s\S]*$/)
      .messages({
        "string.base": "How it works must be a string",
      })
  });
  return Schema.validate(data);
};

module.exports = researchValidationsPost;
