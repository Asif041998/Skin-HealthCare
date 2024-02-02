const Joi = require('joi');

const registrationValidations = (data) => {
  const Schema = Joi.object({
    firstname: Joi.string().min(3).max(30)
      .trim()
      .regex(/^[A-Za-z\s\-.,''""']+$/)
      .messages({
        "string.base": "First name must be a string",
        "string.pattern.base":
          "First name can only contain alphabets",
        "string.empty": "Please enter the first name",
      }),
    lastname: Joi.string().min(3).max(30)
      .trim()
      .regex(/^[A-Za-z\s\-.,''""']+$/)
      .messages({
        "string.base": "Last name must be a string",
        "string.pattern.base":
          "Last name can only contain alphabets",
        "string.empty": "Please enter the last name",

      }),
    email: Joi.string().email().trim().messages({
      "string.empty": "Please enter the email",
    }),
    password: Joi.string().trim().messages({
      "string.empty": "Please enter the password",
    }),
    state: Joi.number().max(51),
    birth_year: Joi.number(),
    race_id: Joi.number().max(13),
    reset_token: Joi.string(),
    fcm_token: Joi.string().trim().messages({
      "string.empty": "Please provide the FCM token",
    }),
  });
  return Schema.validate(data);
};

const loginValidations = (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required().trim().messages({
      "string.empty": "Please enter the email",
    }),
    password: Joi.string().required().trim().messages({
      "string.empty": "Please enter the password",
    }),
    fcm_token: Joi.string().trim().messages({
      "string.empty": "Please provide the FCM token",
    }),
  });
  return Schema.validate(data);
};

module.exports.registrationValidations = registrationValidations;
module.exports.loginValidations = loginValidations;
