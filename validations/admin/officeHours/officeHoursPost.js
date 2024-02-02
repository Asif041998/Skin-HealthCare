const Joi = require('joi');

const officeHoursValidationsPost = (data) => {
  const Schema = Joi.object({
    program_id: Joi.number().required().integer().messages({
      'number.base': 'Program ID must be a number',
      'number.integer': 'Program ID must be an integer',
    }),
    title: Joi.string()
      .trim().required()
      .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
      .messages({
        'string.base': 'Title must be a string',
        'string.pattern.base': 'Title can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character',
      }),
    description: Joi.string()
      .trim()
      .messages({
        'string.base': 'Description must be a string',
        'string.pattern.base': 'Description can contain a combination of alphabets, numbers, and special characters, but must include at least one alphabet character',
      }),
    event_date: Joi.date().iso().required().messages({
      'string.base': 'Event Date must be a string',
    }),
    image_url: Joi.string()
      .trim()
      .required()
      .messages({
        'string.base': 'Image URL must be a string',
      }),
    content_url: Joi.string()
      .trim()
      .required()
      .messages({
        'string.base': 'Content URL must be a string',
      }),
    status: Joi.string().required().valid('active', 'cancelled').required().messages({
      'string.base': 'Status must be a string',
    }),
    speaker_id: Joi.number().required().integer().messages({
      'number.base': 'Speaker ID must be a number',
      'number.integer': 'Speaker ID must be an integer',
    }),
    dolby_viewers_url: Joi.string()
      .trim()
      .messages({
        'string.base': 'Dolby viewers url must be a string',
      }),
    pubnub_channel_name: Joi.string()
      .trim()
      .messages({
        'string.base': 'Pubnub channel name must be a string',
      }),
    pubnub_subscriber_key: Joi.string()
      .trim()
      .messages({
        'string.base': 'Pubnub subscriber key must be a string',
      }),
    pubnub_publisher_key: Joi.string()
      .trim()
      .messages({
        'string.base': 'Pubnub publisher key must be a string',
      }),
    dolby_channel_name: Joi.string()
      .trim()
      .messages({
        'string.base': 'Dolby channel name must be a string',
      }),
    dolby_stream_id: Joi.string()
      .trim()
      .messages({
        'string.base': 'Dolby stream must be a string',
      }),
  });
  return Schema.validate(data);
}

module.exports = officeHoursValidationsPost;
