const Joi = require("joi");

const skincareRoutine101PutValidations = (data) => {
  const Schema = Joi.object({
    title: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.base": "Title must be a string",
        "string.pattern.base":
          "Title can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character",
      }),
    description: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.base": "Description must be a string",
        "string.pattern.base":
          "Description can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character",
      }),
    article_content: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.base": "Article Content must be a string",
        "string.pattern.base":
          "Article Content can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character",
      }),
    article_type: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Article Type must be a string",
        "string.pattern.base":
          "Article Type can only contain a combination of alphabets and numbers",
      }),
    content_type: Joi.string()
      .trim()
      .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]+$/))
      .valid("commonArticle", "commonSkinCareRoutineArticle")
      .messages({
        "string.base": "Content type must be a string",
        "string.pattern.base":
          "Content type can only contain a combination of alphabets, numbers, and special characters",
      }),
    status: Joi.string().valid("published", "draft").messages({
      "string.base": "Status must be a string",
    }),
    routine_type: Joi.string()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .trim()
      .messages({
        "string.base": "Routine type must be a string",
        "string.pattern.base":
          "Routine type can only contain a combination of alphabets and numbers",
      }),
    skincare_suggestion_id: Joi.array().items(Joi.number().integer()),
    video_title: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.base": "Video title must be a string",
        "string.pattern.base":
          "Video title can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character",
      }),
    thumbnail_url: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.base": "Thumbnail url must be a string",
        "string.pattern.base":
          "Thumbnail url can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character",
      }),
    video_url: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.base": "Video URL must be a string",
        "string.pattern.base":
          "Video URL can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character",
      }),
  });
  return Schema.validate(data);
};

module.exports = skincareRoutine101PutValidations;
