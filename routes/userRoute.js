const express = require("express");
const router = express.Router();
//const { bodyMiddleware } = require('../middleware/validator');
const {
    signUp,
    userLogin,
    getAllVendors,
    getAllProducts,
    createOrder,
    forgotPassword,
    checkOtp,
    resetPassword,
} = require("../controllers/userController");
const { bodyMiddleware } = require("../middleware/validator");
const authMiddleware = require("../middleware/authorization");

router.post("/signup", bodyMiddleware("signUp"), signUp);
router.post("/login", bodyMiddleware("login"), userLogin);
router.post(
    "/forgotpassword",
    bodyMiddleware("forgotPassword"),
    forgotPassword
);
router.post("/checkotp", bodyMiddleware("checkOtp"), checkOtp);
router.post("/resetpassword", bodyMiddleware("resetPassword"), resetPassword);

router.use(authMiddleware.authorization(["truck driver"]));
router.get("/vendors", getAllVendors);
router.get("/products", getAllProducts);
router.post("/createorder", bodyMiddleware("order"), createOrder);

module.exports = router;
