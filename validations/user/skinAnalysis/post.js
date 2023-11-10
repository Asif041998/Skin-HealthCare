
const Joi = require("joi");

const skinAnalysisPostValidation = (data) => {
    const Schema = Joi.object({
        user_id: Joi.number().integer().required(),
        image_url: Joi.string().min(3)
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.base": "image_url must be a string",
                "string.pattern.base":
                    "image_url can only contain a combination of alphabets and numbers",
            }),
            dark_spots:Joi.number().integer(),
            face_wrinkles: Joi.number().integer(),
            skin_health : Joi.number().integer(),
            redness : Joi.number().integer(),
            hydration : Joi.number().integer(),
            texture : Joi.number().integer(),
    });
    return Schema.validate(data);
};

module.exports = skinAnalysisPostValidation;
