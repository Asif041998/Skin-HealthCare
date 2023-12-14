const Joi = require("joi");

const productPostValidation = (data) => {
    const Schema = Joi.object({
        user_id: Joi.number().integer().required(),
        image: Joi.string()
            .trim()
            .messages({
                "string.base": "Image URL must be a string",
            }),
        name: Joi.string()
            // .regex(/^[A-Za-z][A-Za-z\s\-']+$/)
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .required()
            .trim()
            .messages({
                "string.empty" : "Please enter the Product Name",
                "string.base": "Product Name must be a string",
                "string.pattern.base":
                    "Product Name can only contain a combination of alphabets and numbers",
            }),
        brand: Joi.string()
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.empty" : "Please enter the Brand Name",
                "string.base": "Brand name must be a string",
                "string.pattern.base":
                    "Brand name can only contain a combination of alphabets and numbers",
            }),
        description: Joi.string()
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.base": "Description must be a string",
                "string.pattern.base":
                    "Description can only contain a combination of alphabets and numbers",
            }),
        purchase_location: Joi.string()
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.empty" : "Please enter the Location Purchased",
                "string.base": "Location Purchased must be a string",
                "string.pattern.base":
                    "Location Purchased can only contain a combination of alphabets and numbers",
            }),
        open_date: Joi.date()
            .iso()
            .messages({
                "date.empty" : "Please enter the Open Date",
                "date.base": "Open Date must be a date",
                "date.format": "Open Date must be in the format YYYY-MM-DD",
            }),
        product_type_id: Joi.number()
            .integer()
            .required()
            .messages({
                "number.base": "Please choose Product Type",
                "number.integer": "Please choose Product Type",

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
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.empty" :"Please enter a Product Name",
                "string.base": "Product Name must be a string",
                "string.pattern.base":
                    "Product Name can only contain a combination of alphabets and numbers",
            }),
        brand: Joi.string().min(3)
            .max(50)
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.empty" :"Please enter a Brand Name",
                "string.base": "Brand name must be a string",
                "string.pattern.base":
                    "Brand name can only contain a combination of alphabets and numbers",
            }),
        description: Joi.string()
            .min(5)
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.base": "Description must be a string",
                "string.pattern.base":
                    "Description can only contain a combination of alphabets and numbers",
            }),
        purchase_location: Joi.string()
            .min(3)
            .max(100)
            .regex(/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-+=,.?/\\;:'"<>\[\]{}|_~`]/)
            .trim()
            .messages({
                "string.empty" : "Please enter the Location Purchased",
                "string.base": "Location Purchased must be a string",
                "string.pattern.base":
                    "Location Purchased can only contain a combination of alphabets and numbers",
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
                "number.base": "Please choose Product Type",
                "number.integer": "Please choose Product Type",
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
