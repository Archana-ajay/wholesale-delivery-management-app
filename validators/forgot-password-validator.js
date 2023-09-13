const Joi = require("joi");

const forgotPasswordSchema = Joi.object({
    mobile: Joi.string()
        .length(10)
        .regex(/^[0-9]{10}$/)
        .required(),
});

module.exports = forgotPasswordSchema;
