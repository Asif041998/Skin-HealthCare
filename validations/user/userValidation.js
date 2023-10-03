const Joi = require('joi');

const registrationValidations = (data) => {
  const Schema = Joi.object({
    firstname: Joi.string().min(3).max(30)
    .trim()
    .regex(/^[A-Za-z\s\-.,''""']+$/)
            .messages({
                "string.base": "Firstname must be a string",
                "string.pattern.base":
                    "Firstname can only contain alphabets"
            }),
    lastname: Joi.string().min(3).max(30)
    .trim()
    .regex(/^[A-Za-z\s\-.,''""']+$/)
            .messages({
                "string.base": "Lastname must be a string",
                "string.pattern.base":
                    "Lastname can only contain alphabets"
            }),
    email: Joi.string().email(),
    password: Joi.string().min(8)
      .pattern(
        new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        )
      )
      .message(
        'Password must be 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      ),
    state: Joi.number().max(51),
    birth_year: Joi.number(),
    race_id: Joi.number().max(12),
    reset_token: Joi.string(),
  });
  return Schema.validate(data);
};

const loginValidations = (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return Schema.validate(data);
};

module.exports.registrationValidations = registrationValidations;
module.exports.loginValidations = loginValidations;
