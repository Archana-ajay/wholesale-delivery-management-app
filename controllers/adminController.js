const db = require("../models");
const { StatusCodes } = require("http-status-codes");
const {
    BadRequestError,
    UnauthenticatedError,
    NotFoundError,
} = require("../errors");
const User = db.User;
const Vendor = db.Vendor;
const Product = db.Product;
const Orders = db.Orders;
const path = require("path");
const jwt = require("../utils/jwt");
const bcrypt = require("../utils/bcrypt");
const temporaryPassword = require("../utils/temporaryPassword");
const pagination = require("../utils/pagination");
const sms = require("../utils/sendSms");

//admin login
const adminLogin = async (req, res) => {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
        throw new BadRequestError("Please provide mobile number and password");
    }
    const admin = await User.findOne({
        where: { phoneNumber: mobile, role: "admin" },
    });
    if (!admin) {
        throw new UnauthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = await bcrypt.verifyPassword(
        password,
        admin.password
    ); //compare password
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid password");
    }
    const tokenPayload = {
        id: admin.id,
        role: admin.role,
    };

    const token = jwt.generateAccessToken(tokenPayload);
    res.status(StatusCodes.OK).json({
        message: "login successful",
        token,
    });
};

//manage truck drivers
//add truck driver
const addUser = async (req, res) => {
    const { mobile, name, address, licenseNumber, licenseType, licenseExpiry } =
        req.body;
    const mobileAlreadyExists = await User.findOne({
        where: { phoneNumber: mobile },
    });
    if (mobileAlreadyExists) {
        throw new BadRequestError("mobile number already exists");
    }
    const tempPassword = await temporaryPassword.generateTemporaryPassword(8);
    console.log(tempPassword);
    password = await bcrypt.hashPassword(tempPassword);
    await sms.sendMessage(mobile, tempPassword);
    const user = await User.create({
        name,
        phoneNumber: mobile,
        password,
        address,
        licenseNumber,
        licenseType,
        licenseExpiry,
    });
    res.status(StatusCodes.CREATED).json({
        user: { name: user.name, mobile: user.phoneNumber },
        message: "add user successfully",
    });
};

//read details of truck drivers who registered to the system
const getAllUsers = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = pagination.getPagination(page, size);
    User.findAndCountAll({
        where: { role: "truck driver" },
        limit,
        offset,
        attributes: [
            "id",
            "name",
            "phoneNumber",
            "address",
            "licenseNumber",
            "licenseType",
            "licenseExpiry",
            "createdAt",
        ],
    }).then((data) => {
        const response = pagination.getPagingData(data, page, limit);
        res.status(StatusCodes.OK).json(response);
    });
};

//read details of a single truck driver
const getUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id,
            role: "truck driver",
        },
        attributes: [
            "id",
            "name",
            "phoneNumber",
            "address",
            "licenseNumber",
            "licenseType",
            "licenseExpiry",
            "createdAt",
        ],
    });
    if (!user) {
        throw new NotFoundError(`No user with id ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ user });
};

//update truck user profile in database
const updateUser = async (req, res) => {
    await User.update(req.body, {
        where: { id: req.params.id, role: "truck driver" },
    });
    const user = await User.findOne({
        where: {
            id: req.params.id,
            role: "truck driver",
        },
        attributes: [
            "id",
            "name",
            "phoneNumber",
            "address",
            "licenseNumber",
            "licenseType",
            "licenseExpiry",
            "createdAt",
        ],
    });
    if (!user) {
        throw new NotFoundError(`No user with id ${req.params.id}`);
    }
    res.status(StatusCodes.CREATED).json({
        message: "updated successfully",
        new_user: user,
    });
};

//delete a truck driver from database
const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id,
            role: "truck driver",
        },
        attributes: [
            "id",
            "name",
            "phoneNumber",
            "address",
            "licenseNumber",
            "licenseType",
            "licenseExpiry",
            "createdAt",
        ],
    });
    if (!user) {
        throw new NotFoundError(`No user with id ${req.params.id}`);
    }
    await User.destroy({
        where: { id: req.params.id, role: "truck driver" },
    });
    res.status(StatusCodes.CREATED).json({
        message: "deleted successfully",
        deleted_user: user,
    });
};

//add vendor
const addVendor = async (req, res) => {
    const { name, mobile, location, email } = req.body;
    const mobileAlreadyExists = await Vendor.findOne({
        where: { phoneNumber: mobile },
    });
    if (mobileAlreadyExists) {
        throw new BadRequestError("mobile number already exists");
    }
    const vendor = await Vendor.create({
        name,
        phoneNumber: mobile,
        location,
        email,
        createdBy: req.user.id,
    });
    res.status(StatusCodes.CREATED).json({
        vendor: { name: vendor.name, mobile: vendor.phoneNumber },
        message: "add vendor successfully",
    });
};

//read details of vendor
const getAllVendors = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = pagination.getPagination(page, size);
    Vendor.findAndCountAll({
        where: { createdBy: req.user.id },
        limit,
        offset,
    }).then((data) => {
        const response = pagination.getPagingData(data, page, limit);
        res.status(StatusCodes.OK).json(response);
    });
};

//read details of a single vendor
const getVendor = async (req, res) => {
    const vendor = await Vendor.findOne({
        where: {
            id: req.params.id,
            createdBy: req.user.id,
        },
    });
    if (!vendor) {
        throw new NotFoundError(`No vendor with id ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ vendor });
};

//update details of vendor
const updateVendor = async (req, res) => {
    await Vendor.update(req.body, {
        where: { id: req.params.id, createdBy: req.user.id },
    });
    const vendor = await Vendor.findOne({
        where: {
            id: req.params.id,
            createdBy: req.user.id,
        },
    });
    if (!vendor) {
        throw new NotFoundError(`No vendor with id ${req.params.id}`);
    }
    res.status(StatusCodes.CREATED).json({
        message: "updated successfully",
        updated_vendor: vendor,
    });
};

//delete a vendor from database
const deleteVendor = async (req, res) => {
    const vendor = await Vendor.findOne({
        where: {
            id: req.params.id,
            createdBy: req.user.id,
        },
    });
    if (!vendor) {
        throw new NotFoundError(`No vendor with id ${req.params.id}`);
    }
    await Vendor.destroy({
        where: { id: req.params.id, createdBy: req.user.id },
    });
    res.status(StatusCodes.CREATED).json({
        message: "deleted successfully",
        deleted_vendpr: vendor,
    });
};

//create product and save it in the databse
const createProduct = async (req, res) => {
    if (!req.files) {
        throw new BadRequestError("No File Uploaded");
    }
    const productImage = req.files.image;
    const extensionName = path.extname(productImage.name);
    const allowedExtension = [".png", ".jpg", ".jpeg"];
    if (!allowedExtension.includes(extensionName)) {
        throw new BadRequestError("Please Upload a valid Image");
    }
    const imagePath = path.join(
        __dirname,
        "../uploads/" + `${productImage.name}`
    );
    await productImage.mv(imagePath);
    req.body.imageUrl = `/api/v1/uploads/${productImage.name}`;
    req.body.createdBy = req.user.id;
    const productexist = await Product.findOne({
        where: {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        },
    });
    if (productexist) {
        throw new BadRequestError("product already added");
    }
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
};

//retrieve all the product created by admin from database
const getAllProducts = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = pagination.getPagination(page, size);
    Product.findAndCountAll({
        where: { createdBy: req.user.id },
        limit,
        offset,
    }).then((data) => {
        const response = pagination.getPagingData(data, page, limit);
        res.status(StatusCodes.OK).json(response);
    });
};

//retrieve a single product from database
const getProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id,
            createdBy: req.user.id,
        },
    });
    if (!product) {
        throw new NotFoundError(`No product with id ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ product });
};

// //update a product in database
const updateProduct = async (req, res) => {
    await Product.update(req.body, {
        where: { id: req.params.id, createdBy: req.user.id },
    });
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        throw new NotFoundError(`No product with id ${req.params.id}`);
    }
    res.status(StatusCodes.CREATED).json({
        message: "updated successfully",
        updated_product: product,
    });
};

//delete a product from database
const deleteProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        throw new NotFoundError(`No product with id ${req.params.id}`);
    }
    await Product.destroy({
        where: { id: req.params.id, createdBy: req.user.id },
    });
    res.status(StatusCodes.CREATED).json({
        message: "deleted successfully",
        deleted_product: product,
    });
};

//create order
const createOrder = async (req, res) => {
    const vendor = await Vendor.findOne({
        where: { id: req.body.vendorId },
    });
    if (!vendor) {
        throw new BadRequestError("enter a valid vendor id");
    }
    const truckDriver = await User.findOne({
        where: { id: req.body.truckDriverId, role: "truck driver" },
    });
    if (!truckDriver) {
        throw new BadRequestError("enter a valid truck driver id");
    }
    const { products, vendorId, truckDriverId, collectedAmount } = req.body;
    // Calculate the total amount by fetching prices from the database
    let totalAmount = 0;

    for (const productInfo of products) {
        const { productId, quantity } = productInfo;
        // Fetch the product price from the database
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new NotFoundError(`Product with ID ${productId} not found`);
        }

        totalAmount += product.price * quantity;
    }
    // Create the order
    const order = await Orders.create({
        vendorId,
        products,
        truckDriverId,
        collectedAmount,
        totalAmount,
        createdBy: req.user.id,
    });
    res.status(StatusCodes.OK).json({
        message: "create order successfully",
        id: order.id,
        vendorId: order.vendorId,
        products: order.products,
        truckDriverId: order.truckDriverId,
        collectedAmount: order.collectedAmount,
        totalAmount: order.totalAmount,
    });
};

//read orders
const getAllOrders = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = pagination.getPagination(page, size);
    Orders.findAndCountAll({
        limit,
        offset,
        attributes: [
            "id",
            "products",
            "collectedAmount",
            "totalAmount",
            "createdBy",
        ],
        include: [
            {
                model: Vendor,
                as: "vendor",
                attributes: ["id", "name", "phoneNumber", "email"],
            },
            {
                model: User,
                as: "truckDriver",
                attributes: [
                    "id",
                    "name",
                    "phoneNumber",
                    "address",
                    "licenseNumber",
                ],
            },
        ],
    }).then((data) => {
        const response = pagination.getPagingData(data, page, limit);
        res.status(StatusCodes.OK).json(response);
    });
};

module.exports = {
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
};
