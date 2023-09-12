const BadRequestError = require("../errors/bad-request");
const jwt = require("jsonwebtoken");

exports.generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
// exports.generateAccessToken = (payload) => {
//     try {
//       return jwt.sign(
//         { ...payload, source: CONSTANTS.JWT.tokenSource.accessToken },
//         CONSTANTS.JWT.secret,
//         {
//           expiresIn: CONSTANTS.JWT.accessToken.expiresIn,
//         }
//       );
//     } catch (ex) {
//       loggerUtil.error(ex);
//       return false;
//     }
//   };

exports.verifyToken = (token) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) throw new BadRequestError("Invalid Token");
            resolve(decoded);
            reject(err);
        });
    });
};


exports.generateAdminToken = (user, pass) => {
    return jwt.sign(
        { username: user, password: pass },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};