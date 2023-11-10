const Joi = require("joi");

const skincareRoutine101PostValidations = (data) => {
  const schema = Joi.object({
    // title: Joi.string().min(3).max(50).required().trim()
    //     .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]+$/))
    //     .messages({
    //         "string.base": "Title must be a string",
    //         "string.pattern.base": "Title can only contain a combination of alphabets, numbers, and special characters",
    //     }),
    article_content: Joi.string()
      .min(3)
      .required()
      .trim()
      .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]+$/))
      .messages({
        "string.base": "Article content must be a string",
        "string.pattern.base":
          "Article content can only contain a combination of alphabets, numbers, and special characters",
      }),
    description: Joi.string()
      .min(5)
      .trim()
      .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]+$/))
      .messages({
        "string.base": "Description must be a string",
        "string.pattern.base":
          "Description can only contain a combination of alphabets, numbers, and special characters",
      }),
    article_type: Joi.string()
      .min(5)
      .required()
      .trim()
      .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]+$/))
      .messages({
        "string.base": "Article type must be a string",
        "string.pattern.base":
          "Article type can only contain a combination of alphabets, numbers, and special characters",
      }),
    content_type: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]+$/))
      .valid("commonArticle", "commonSkinCareRoutineArticle")
      .messages({
        "string.base": "Content type must be a string",
        "string.pattern.base":
          "Content type can only contain a combination of alphabets, numbers, and special characters",
      }),
    status: Joi.string().valid("published", "draft").required().messages({
      "string.base": "Status must be a string",
      "any.only": "Status must be 'published' or 'draft'",
    }),
    routine_type: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]+$/))
      .messages({
        "string.base": "Routine Type must be a string",
        "string.pattern.base":
          "Routine Type can only contain a combination of alphabets, numbers, and special characters",
      }),
    skincare_suggestion_id: Joi.array().items(Joi.number().integer()),
    video_title: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]+$/))
      .messages({
        "string.base": "Video title must be a string",
        "string.pattern.base":
          "Video title can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character",
      }),
    thumbnail_url: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]+$/))
      .messages({
        "string.base": "Thumbnail URL must be a string",
        "string.pattern.base":
          "Thumbnail URL can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character",
      }),
    video_url: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]+$/))
      .messages({
        "string.base": "Video URL must be a string",
        "string.pattern.base":
          "Video URL can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character",
      }),
  });

  return schema.validate(data);
};

module.exports = skincareRoutine101PostValidations;
