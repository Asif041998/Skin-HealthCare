const Joi = require("joi");

const meditationValidationsPost = (data) => {
  const Schema = Joi.object({
    program_id: Joi.number().integer().required(),
    title: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.base": "Title must be a string",
        'string.pattern.base': 'Title can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character',
      })
      .required(),
    description: Joi.string()
      .trim()
      .messages({
        "string.base": "Description must be a string",
        "string.pattern.base":
          "Description can only contain combination of alphabets and numbers",
      }),
    image_url: Joi.string()
      .trim()
      .messages({
        "string.base": "Image URL must be a string",
      })
      .required(),
    content_url: Joi.string()
      .trim()
      .messages({
        "string.base": "Content URL must be a string",
      })
      .required(),
    status: Joi.string()
      .valid("active", "cancelled")
      .messages({
        "string.base": "Status must be a string",
      })
      .required(),
    file_type: Joi.string()
      .trim()
      .required()
      .valid("audio", "video")
      .messages({
        "number.base": "Speaker ID must be a number",
        "number.integer": "Speaker ID must be an integer",
      })
  });
  return Schema.validate(data);
};

module.exports = meditationValidationsPost;
