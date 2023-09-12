const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required().min(3).max(25),
    image: Joi.string(),
    price: Joi.number().required(),
    category:Joi.string().trim().max(30).required(),
    

});



module.exports = productSchema;