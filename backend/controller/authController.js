const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const {
    User
} = require('../models');

const signup = async (req, res) => {
    try {
        const { name, email, password, address, phone, role } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            address,
            phone,
            role: role || 'customer',
        });

        await newUser.save();

        res.status(StatusCodes.CREATED).json({
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error during registration',
            error: error.message,
        });
    }
};

module.exports = { signup };