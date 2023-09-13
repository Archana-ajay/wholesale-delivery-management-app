const express = require("express");
const router = express.Router();
//const { bodyMiddleware } = require('../middleware/validator');
const {
    adminLogin,
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    addVendor,
    getAllVendors,
    getVendor,
    updateVendor,
    deleteVendor,
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createOrder,
    getAllOrders,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authorization");
const { bodyMiddleware } = require("../middleware/validator");

//login
router.post("/login", bodyMiddleware("login"), adminLogin);

router.use(authMiddleware.authorization(["admin"]));
//manage truck drivers
router.post("/adduser", bodyMiddleware("truckDriverSchema"), addUser);
router.get("/getallusers", getAllUsers);
router.get("/getuser/:id", getUser);
router.patch(
    "/updateuser/:id",
    bodyMiddleware("truckDriverUpdateSchema"),
    updateUser
);
router.delete("/deleteuser/:id", deleteUser);

//manage vendors
router.post("/addvendor", bodyMiddleware("vendor"), addVendor);
router.get("/getallvendors", getAllVendors);
router.get("/getvendor/:id", getVendor);
router.patch("/updatevendor/:id", bodyMiddleware("vendorUpdate"), updateVendor);
router.delete("/deletevendor/:id", deleteVendor);

//manage product
router.post("/addproduct", bodyMiddleware("product"), createProduct);
router.get("/getallproducts", getAllProducts);
router.get("/getproduct/:id", getProduct);
router.patch(
    "/updateproduct/:id",
    bodyMiddleware("productUpdate"),
    updateProduct
);
router.delete("/deleteproduct/:id", deleteProduct);

//manage order
router.post("/createorder", bodyMiddleware("orderSchema"), createOrder);
router.get("/getallorders", getAllOrders);

module.exports = router;
