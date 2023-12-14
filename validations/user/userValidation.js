const Joi = require('joi');

const registrationValidations = (data) => {
  const Schema = Joi.object({
    firstname: Joi.string().min(3).max(30)
      .trim()
      .regex(/^[A-Za-z\s\-.,''""']+$/)
      .messages({
        "string.base": "First Name must be a string",
        "string.pattern.base":
          "First Name can only contain alphabets",
          "string.empty": "Please enter the First Name",
      }),
    lastname: Joi.string().min(3).max(30)
      .trim()
      .regex(/^[A-Za-z\s\-.,''""']+$/)
      .messages({
        "string.base": "Last Name must be a string",
        "string.pattern.base":
          "Last Name can only contain alphabets",
          "string.empty": "Please enter the Last Name",

      }),
    email: Joi.string().email().trim().messages({
      "string.empty": "Please enter the Email",
    }),
    password: Joi.string().trim().messages({
      "string.empty": "Please enter the Password",
    }),
      // .min(8)
      // .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).*$/)
      // .message('Password must be 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'),

    state: Joi.number().max(51),
    birth_year: Joi.number(),
    race_id: Joi.number().max(12),
    reset_token: Joi.string(),
    fcm_token: Joi.string(),
  });
  return Schema.validate(data);
};

const loginValidations = (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required().trim().messages({
      "string.empty" : "Please enter the Email",
    }),
    password: Joi.string().required().trim().messages({
      "string.empty" : "Please enter the Password",
    }),
    fcm_token: Joi.string().trim().messages({
      "string.empty" : "Please enter the FCM token",
    }),
  });
  return Schema.validate(data);
};

module.exports.registrationValidations = registrationValidations;
module.exports.loginValidations = loginValidations;
