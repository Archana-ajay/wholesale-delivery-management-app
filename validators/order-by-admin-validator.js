const Joi = require('joi');

const productsSchema=Joi.object({
    productId:Joi.string().uuid().required(),
    quantity:Joi.number().integer().min(1).required()
})
const orderSchema = Joi.object({
    truckDriverId:Joi.string().uuid().required(),
    vendorId:Joi.string().uuid().required(),
    collectedAmount:Joi.number().required(),
    products:Joi.array().items(productsSchema)

});
module.exports=orderSchema;
