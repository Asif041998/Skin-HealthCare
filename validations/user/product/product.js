const Joi = require("joi");

const productPostValidation = (data) => {
    const Schema = Joi.object({
        user_id: Joi.number().integer().required(),
        image: Joi.string()
            .trim()
            .messages({
                "string.base": "Image URL must be a string",
            }),
        name: Joi.string().min(3)
            .max(50)
            .regex(/^[A-Za-z][A-Za-z\s\-']+$/)
            .required()
            .trim()
            .messages({
                "string.base": "Name must be a string",
                "string.pattern.base":
                    "Name can only contain a combination of alphabets and numbers",
            }),
        brand: Joi.string().min(3)
            .max(50)
            .regex(/^[A-Za-z][A-Za-z\s\-']+$/)
            .trim()
            .messages({
                "string.base": "Brand name must be a string",
                "string.pattern.base":
                    "Brand name can only contain a combination of alphabets and numbers",
            }),
        description: Joi.string()
            .min(5)
            .regex(/^[A-Za-z][A-Za-z0-9\s\S]*$/)
            .trim()
            .messages({
                "string.base": "Description must be a string",
                "string.pattern.base":
                    "Description can only contain a combination of alphabets and numbers",
            }),
        purchase_location: Joi.string()
            .min(3)
            .max(100)
            .regex(/^[A-Za-z0-9][A-Za-z0-9\s\S]*$/)
            .trim()
            .messages({
                "string.base": "Location must be a string",
                "string.pattern.base":
                    "Location can only contain a combination of alphabets and numbers",
            }),
        open_date: Joi.date()
            .iso()
            .messages({
                "date.base": "Open_date must be a date",
                "date.format": "Open_date must be in the format YYYY-MM-DD",
            }),
        product_type_id: Joi.number()
            .integer()
            .required()
            .messages({
                "number.base": "Product_type must be a number",
                "number.integer": "Product_type must be an integer",
            }),
        price: Joi.number()
            .precision(2) 
            .messages({
                "number.base": "Price must be a number",
            }),
        expiration_date: Joi.date()
            .iso()
            .messages({
                "date.base": "Expiration_date must be a date",
                "date.format": "Expiration_date must be in the format YYYY-MM-DD",
            }),

    });
    return Schema.validate(data);
};

const productPutValidation = (data) => {
    const Schema = Joi.object({
        user_id: Joi.number().integer(),
        image: Joi.string()
            .trim()
            .messages({
                "string.base": "Image URL must be a string",
            }),
        name: Joi.string().min(3)
            .max(50)
            .regex(/^[A-Za-z][A-Za-z\s\-']+$/)
            .trim()
            .messages({
                "string.base": "Name must be a string",
                "string.pattern.base":
                    "Name can only contain a combination of alphabets and numbers",
            }),
        brand: Joi.string().min(3)
            .max(50)
            .regex(/^[A-Za-z][A-Za-z\s\-']+$/)
            .trim()
            .messages({
                "string.base": "Brand name must be a string",
                "string.pattern.base":
                    "Brand name can only contain a combination of alphabets and numbers",
            }),
        description: Joi.string()
            .min(5)
            .regex(/^[A-Za-z][A-Za-z0-9\s\S]*$/)
            .trim()
            .messages({
                "string.base": "Description must be a string",
                "string.pattern.base":
                    "Description can only contain a combination of alphabets and numbers",
            }),
        purchase_location: Joi.string()
            .min(3)
            .max(100)
            .regex(/^[A-Za-z0-9][A-Za-z0-9\s\S]*$/)
            .trim()
            .messages({
                "string.base": "Location must be a string",
                "string.pattern.base":
                    "Location can only contain a combination of alphabets and numbers",
            }),
        open_date: Joi.date()
            .iso()
            .messages({
                "date.base": "Open_date must be a date",
                "date.format": "Open_date must be in the format YYYY-MM-DD",
            }),
        product_type_id: Joi.number()
            .integer()
            .messages({
                "number.base": "Product_type must be a number",
                "number.integer": "Product_type must be an integer",
            }),
        price: Joi.number()
            .precision(2) 
            .messages({
                "number.base": "Price must be a number",
            }),
        expiration_date: Joi.date()
            .iso()
            .messages({
                "date.base": "Expiration_date must be a date",
                "date.format": "Expiration_date must be in the format YYYY-MM-DD",
            }),

    });
    return Schema.validate(data);
};

module.exports = productPostValidation;
module.exports = productPutValidation;
