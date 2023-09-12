const Joi = require('joi');

const vendorUpdateSchema = Joi.object({
    mobile:Joi
    .string()
    .length(10)
    .regex(/^[0-9]{10}$/)
    .optional(),
    name: Joi.string().trim().min(3).optional(),
    location:Joi.string().trim().max(30).optional(),
    email: Joi.string().trim().email().lowercase().optional(),

});

module.exports=vendorUpdateSchema;