const Joi = require("joi");

const skinIndexArticlesPostValidation = (data) => {
    const Schema = Joi.object({
        image: Joi.array().items(Joi.string()).min(1)
            .messages({
                "string.base": "Image must be a string",
            }).required(),
        title: Joi.string()
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .required()
            .trim()
            .messages({
                "string.base": "Title must be a string",
                "string.pattern.base":
                    "Title can only contain a combination of alphabets and numbers",
            }),
        article_content: Joi.string().min(3)
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.base": "article_content must be a string",
                "string.pattern.base":
                    "article_content can only contain a combination of alphabets and numbers",
            }).required(),
        description: Joi.string()
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.base": "Description must be a string",
                "string.pattern.base":
                    "Description can only contain a combination of alphabets and numbers",
            }),
        article_type: Joi.string()
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.base": "article_type must be a string",
                "string.pattern.base":
                    "article_type can only contain a combination of alphabets and numbers",
            }).required(),
        screen_image: Joi.string()
            .trim()
            .messages({
                "string.base": "Screen image must be a string",
            }).required(),
        screen_image_title: Joi.string()
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.base": "Screen image title must be a string",
            }).required(),
        content_type: Joi.string()
            .valid("commonArticle", "commonSkinCareRoutineArticle")
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.base": "Content type must be a string",
            }).required(),
        status: Joi.string()
            .valid("published", "draft")
            .messages({
                "string.base": "status must be a string",
            }).required(),
    });
    return Schema.validate(data);
};

module.exports = skinIndexArticlesPostValidation;