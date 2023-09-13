const login = require('./login-validator');
const signUp = require('./signup-validator');
const truckDriverSchema = require('./truck-driver-validator');
const truckDriverUpdateSchema = require('./truck-driver-update-validator');
const vendor = require('./vendor-validator');
const vendorUpdate=require('./vendor-update-validator')
const product=require('./product-validator')
const productUpdate=require('./truck-driver-update-validator')
const order=require('./order-by-user-validator')
const orderSchema=require('./order-by-admin-validator')

module.exports = {
    login,
    signUp,
    truckDriverSchema,
    truckDriverUpdateSchema,
    vendor,
    vendorUpdate,
    product,
    productUpdate,
    order,
    orderSchema
};