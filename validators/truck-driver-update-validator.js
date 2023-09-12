const Joi = require('joi');
const truckDriverUpdateSchema = Joi.object({
    mobile:Joi
    .string()
    .length(10)
    .regex(/^[0-9]{10}$/)
    .optional(),
    name: Joi.string().trim().min(3).optional(),
    address:Joi.string().trim().max(30).optional(),
    licenseNumber:Joi.string().trim().length(8).optional(),
    licenseType:Joi.string().trim().optional(),
    licenseExpiry:Joi.date().optional()

});
module.exports = truckDriverUpdateSchema