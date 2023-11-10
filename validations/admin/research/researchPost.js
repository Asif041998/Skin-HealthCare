const Joi = require("joi");

const researchValidationsPost = (data) => {
  const Schema = Joi.object({
    title: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.empty" : "Please enter the Title",
        "string.base": "Title must be a string",
        "string.pattern.base":
          "Title can only contain combination of alphabets and numbers",
      })
      .required(),
    description: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.empty" : "Please enter the Description",
        "string.base": "Description must be a string",
        "string.pattern.base":
          "Description can only contain combination of alphabets and numbers",
      }),
    impact: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.empty" : "Please enter Making an Impact",
        "string.base": "Making an Impact must be a string",
      })
      .required(),
    works: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({        
        "string.empty" : "Please enter the How it Works",
        "string.base": "How it works must be a string",
      })
  });
  return Schema.validate(data);
};

module.exports = researchValidationsPost;
