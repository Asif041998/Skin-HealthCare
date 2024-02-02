const Joi = require('joi');
const registrationValidation = (data) => {
    const Schema = Joi.object({
        firstname: Joi
            .string()
            .min(3)
            .max(30),

        lastname: Joi
            .string()
            .min(3)
            .max(30),

        email: Joi
            .string()
            .min(3)
            .required()
            .email(),

        password: Joi
            .string()
            .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).message('Password must be 8 characters long and contain at least one letter, one number, and one special character.'),

        token: Joi.string(),
    });
    return Schema.validate(data);
}


const loginValidation = (data) => {
    const Schema = Joi.object({
        email: Joi
            .string()
            .required(),

        password: Joi
            .string()
            .min(8)
            .required(),

    });
    return Schema.validate(data);
}

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;