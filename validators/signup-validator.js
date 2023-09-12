const Joi = require('joi');

const signupSchema = Joi.object({
    mobile:Joi
    .string()
    .length(10)
    .regex(/^[0-9]{10}$/)
    .required(),
    password: Joi.string().trim().min(8).required(),
    name: Joi.string().trim().min(3).required(),
    address:Joi.string().trim().max(30).optional(),
    licenseNumber:Joi.string().trim().length(8).optional(),
    licenseType:Joi.string().trim().optional(),
    licenseExpiry:Joi.date().optional()

});

module.exports = signupSchema;