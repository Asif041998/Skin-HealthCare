const Joi = require("joi");

const speakerValidationsPost = (data) => {
  const Schema = Joi.object({
    name: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.empty": "Please enter the Name",
        "string.base": "Name must be a string",
        "string.pattern.base":
          "Name can only contain only alphabets",
      })
      .required(),
    qualifications: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.empty": "Please enter Qualification",
        "string.base": "Qualification must be a string",
      })
      .required(),
    image_url: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        "string.empty": "Please provide the Image",
        "string.base": "Image must be a string",
      }),
  });
  return Schema.validate(data);
};

module.exports = speakerValidationsPost;
