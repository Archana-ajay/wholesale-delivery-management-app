const db = require('../models');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const User = db.User;
const Vendor=db.Vendor;
const Product=db.Product;
const jwt = require("../utils/jwt");
const bcrypt = require("../utils/bcrypt");
const pagination=require('../utils/pagination')

//signup
const signUp = async (req, res) => {
    var { mobile, name, password,address,licenseNumber,licenseType,licenseExpiry } = req.body;
    const emailAlreadyExists = await User.findOne({ where: { phoneNumber:mobile } });
    if (emailAlreadyExists) {
        throw new BadRequestError('phone number already exists');
    }
    const isFirstAccount=(await User.count())===0
    const role=isFirstAccount?'admin':'truck driver';
    password = await bcrypt.hashPassword(password);
    const user = await User.create({ name, phoneNumber:mobile,role, password,address,licenseNumber,licenseType,licenseExpiry });
    res.status(StatusCodes.CREATED).json({
        user: { name: user.name },
        message: 'signup successful',
    });
};

//user login
const userLogin = async (req, res) => {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
        throw new BadRequestError('Please provide mobile number and password');
    }
    const user = await User.findOne({ where: { phoneNumber:mobile,role:"truck driver" } });
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await bcrypt.verifyPassword(password, user.password); //compare password
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid password');
    }
    const tokenPayload = {
        id: user.id,
        role: user.role,
      };
    
    const token = jwt.generateAccessToken(tokenPayload);
    res.status(StatusCodes.OK).json({
        message: 'login successful',
        token,
    });
};

//vendor list to select vendor for truck driver
const getAllVendors= async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = pagination.getPagination(page, size);
    Vendor.findAndCountAll({
        limit,
        offset,
        attributes: [
            "id",
            "name",
            "phoneNumber",
            "location",
            "email"
        ],
    }).then((data) => {
        const response = pagination.getPagingData(data, page, limit);
        res.status(StatusCodes.OK).json(response);
    });
};

//product list for user to select products
const getAllProducts = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = pagination.getPagination(page, size);
    Product.findAndCountAll({
        limit,
        offset,
        attributes: [
            "id",
            "name",
            "imageUrl",
            "price",
            "category"
        ],
    }).then((data) => {
        const response = pagination.getPagingData(data, page, limit);
        res.status(StatusCodes.OK).json(response);
    });
};

module.exports = {
    signUp,
    userLogin,
    getAllVendors,
    getAllProducts
};