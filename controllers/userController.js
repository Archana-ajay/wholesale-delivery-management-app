const db = require('../models');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const User = db.User;
const jwt = require("../utils/jwt");
const bcrypt = require("../utils/bcrypt");

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

module.exports = {
    signUp
};