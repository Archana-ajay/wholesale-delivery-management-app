const Joi = require('joi');

const loginSchema = Joi.object({
    mobile:Joi
    .string()
    .length(10)
    .regex(/^[0-9]{10}$/)
    .required(),
    password: Joi.string().trim().min(6).required(),
});

module.exports = loginSchema;