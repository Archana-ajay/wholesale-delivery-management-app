const Joi = require('joi');

const vendorSchema = Joi.object({
    mobile:Joi
    .string()
    .length(10)
    .regex(/^[0-9]{10}$/)
    .required(),
    name: Joi.string().trim().min(3).required(),
    location:Joi.string().trim().max(30).required(),
    email: Joi.string().trim().email().lowercase().required(),

});


module.exports = vendorSchema;