const Joi = require("joi");

const carePostValidation = (data) => {
  const Schema = Joi.object({
    user_id: Joi.number().integer().required(),
    answer_id: Joi.number(),
    firstname: Joi.string()
      .trim()
      .regex(/^[A-Za-z\s\-.,''""']+$/)
      .messages({
        "string.base": "First name must be a string",
        "string.pattern.base": "First name can only contain alphabets",
        "string.empty": "Please enter the first name",
      }),
    lastname: Joi.string()
      .trim()
      .regex(/^[A-Za-z\s\-.,''""']+$/)
      .messages({
        "string.base": "Last name must be a string",
        "string.pattern.base": "Last name can only contain alphabets",
        "string.empty": "Please enter the last name",
      }),
      email: Joi.string().email().trim().messages({
        "string.empty": "Please enter the email",
        "string.email": "Please enter a valid email",
    }),
    state: Joi.number().integer().required().messages({
        "number.base": "State must be a number",
        "number.integer": "State must be an integer",
        "any.required": "Please enter the state",
      }),
    skin_concern: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Skin Concern must be a string",
        "string.pattern.base": "Skin Concern can only contain only alphabets",
        "string.empty": "Please enter What id your skin concern",
      }),
  });
  return Schema.validate(data);
};

module.exports = carePostValidation;
