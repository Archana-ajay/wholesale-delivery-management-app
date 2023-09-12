const Joi = require('joi');

const productUpdateSchema = Joi.object({
    name: Joi.string().optional().min(3).max(25),
    image: Joi.string().optional(),
    price: Joi.number().required().optional(),
    category:Joi.string().trim().max(30).optional(),
    

});
module.exports=productUpdateSchema;
