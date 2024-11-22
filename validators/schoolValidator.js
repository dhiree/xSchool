const Joi = require('joi');

const schoolSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name should be at least 3 characters long',
        'string.max': 'Name should not be more than 100 characters',
        'any.required': 'Name is required',
    }),
    address: Joi.string().min(5).max(200).required().messages({
        'string.base': 'Address must be a string',
        'string.min': 'Address should be at least 5 characters long',
        'string.max': 'Address should not be more than 200 characters',
        'any.required': 'Address is required',
    }),
    latitude: Joi.number().required().messages({
        'number.base': 'Latitude must be a number',
        'any.required': 'Latitude is required',
    }),
    longitude: Joi.number().required().messages({
        'number.base': 'Longitude must be a number',
        'any.required': 'Longitude is required',
    }),
});

module.exports = { schoolSchema };
