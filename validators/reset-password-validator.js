const Joi = require("joi");

const resetPasswordSchema = Joi.object({
    mobile: Joi.string()
        .length(10)
        .regex(/^[0-9]{10}$/)
        .required(),
    code: Joi.string().length(4).required(),
    password: Joi.string().trim().min(8).required(),
});

module.exports = resetPasswordSchema;
