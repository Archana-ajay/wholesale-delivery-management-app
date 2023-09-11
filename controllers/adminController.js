const db = require('../models');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError,NotFoundError } = require('../errors');
const User = db.User;
const jwt = require("../utils/jwt");
const bcrypt = require("../utils/bcrypt");
const temporaryPassword=require("../utils/temporaryPassword");
const pagination=require('../utils/pagination')


//admin login
const adminLogin = async (req, res) => {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
        throw new BadRequestError('Please provide mobile number and password');
    }
    const admin = await User.findOne({ where: { phoneNumber:mobile,role:"admin" } });
    if (!admin) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await bcrypt.verifyPassword(password, admin.password); //compare password
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid password');
    }
    const token = jwt.generateAdminToken(admin.phoneNumber,admin.password);
    res.status(StatusCodes.OK).json({
        message: 'login successful',
        token,
    });
};

//manage truck drivers
//add truck driver
const addUser = async (req, res) => {
    var { mobile, name,address,licenseNumber,licenseType,licenseExpiry } = req.body;
    const mobileAlreadyExists = await User.findOne({ where: { phoneNumber:mobile } });
    if (mobileAlreadyExists) {
        throw new BadRequestError('mobile number already exists');
    }
    const tempPassword=temporaryPassword.generateTemporaryPassword(8);
    console.log(tempPassword);
    password = await bcrypt.hashPassword(tempPassword);
    const user = await User.create({ name, phoneNumber:mobile, password,address,licenseNumber,licenseType,licenseExpiry });
    res.status(StatusCodes.CREATED).json({
        user: { name: user.name,mobile:user.phoneNumber },
        message: 'add user successfully',
    });
};

//read details of truck drivers who registered to the system
const getAllUsers= async (req, res) => {
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
            "createdAt"
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
            "createdAt"
        ],
    });
    if (!user) {
        throw new NotFoundError(`No user with id ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ user });
};

module.exports = {
    adminLogin,
    addUser,
    getAllUsers,
    getUser
};