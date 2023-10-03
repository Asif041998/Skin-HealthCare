const Joi = require("joi");

const meditationValidationsPut = (data) => {
    const Schema = Joi.object({
      program_id: Joi.number().integer().messages({
        "number.base": "Program ID must be a number",
        "number.integer": "Program ID must be an integer",
      }),
      title: Joi.string()
        .trim()
        .regex(/^[A-Za-z0-9\s.,?''":;( )\[\]{}\-&!]+$/)
        .messages({
          "string.base": "Title must be a string",
          'string.pattern.base': 'Title can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character',

        }),
      description: Joi.string()
        .trim()
        .messages({
          "string.base": "Description must be a string",
          "string.pattern.base":
            "Description can only contain combination of alphabets and numbers",
        }),
      image_url: Joi.string().trim().messages({
        "string.base": "Image URL must be a string",
      }),
      content_url: Joi.string().trim().messages({
        "string.base": "Content URL must be a string",
      }),
      status: Joi.string().valid("active", "cancelled").messages({
        "string.base": "Status must be a string",
      }),
      file_type: Joi.string().trim().valid("audio", "video").messages({
        "number.base": "Speaker ID must be a number",
        "number.integer": "Speaker ID must be an integer",
      }),
    });
    return Schema.validate(data);
  };

  module.exports = meditationValidationsPut;
