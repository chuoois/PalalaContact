const { User } = require('../models');
const { StatusCodes } = require('http-status-codes');

const checkEmailExists = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Email is required',
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Email already exists',
            });
        }

        next();
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error checking email',
            error: error.message,
        });
    }
};

module.exports = {
    checkEmailExists,
};
