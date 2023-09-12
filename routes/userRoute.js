const express = require('express');
const router = express.Router();
//const { bodyMiddleware } = require('../middleware/validator');
const { signUp,userLogin,getAllVendors,getAllProducts } = require('../controllers/userController');
const { bodyMiddleware } = require('../middleware/validator');


router.post('/signup',bodyMiddleware('signUp'), signUp);
router.post('/login',bodyMiddleware('login'), userLogin);
router.get('/vendors', getAllVendors);
router.get('/products', getAllProducts);

module.exports = router;