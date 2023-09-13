const Joi = require("joi");

const checkOtpSchema = Joi.object({
    mobile: Joi.string()
        .length(10)
        .regex(/^[0-9]{10}$/)
        .required(),
    code: Joi.string().length(4).required(),
});

module.exports = checkOtpSchema;
