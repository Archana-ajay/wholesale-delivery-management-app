const express = require('express');
const router = express.Router();
//const { bodyMiddleware } = require('../middleware/validator');
const {  adminLogin,addUser,getAllUsers,getUser } = require('../controllers/adminController');

router.post('/login', adminLogin);
router.post('/adduser', addUser);
router.get('/getallusers', getAllUsers);
router.get('/getuser/:id',getUser );

module.exports = router;