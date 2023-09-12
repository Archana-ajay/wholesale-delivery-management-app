const createHttpError = require('http-errors');
const validators = require('../validators');

module.exports.bodyMiddleware = function (validator) {
    return async function (req, res, next) {
        try {
            const validated = await validators[validator].validateAsync(
                req.body
            );
            req.body = validated;
            next();
        } catch (err) {
            //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
            if (err.isJoi)
                return next(createHttpError(422, { message: err.message }));
            next(createHttpError(500));
        }
    };
};