const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { env } = require('../configs/environment');
const { StatusCodes } = require('http-status-codes');
const { verifyToken } = require('../helpers/verifytoken-google');
const {
    Users
} = require('../models');

const signup = async (req, res) => {
    try {
        const { name, email, password, comparePassword } = req.body;

        // all the data should exists
        if (!(name && email && password && comparePassword)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Tất cả các trường là bắt buộc',
            });
        }

        // check if passwords match
        if (password !== comparePassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Mật khẩu và xác nhận mật khẩu không khớp',
            });
        }

        // check if user already exists
        const existingUser = await Users.findOne({ email: email });
        console.log("Existing user:", existingUser);
        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Người dùng đã tồn tại',
            });
        }

        // encrypt the password
        const myEncPassword = await bcrypt.hash(password, 10);
        // create a new user
        const user = await Users.create({
            name,
            email,
            password: myEncPassword,
            address: {
                street: '',
                city: '',
                country: '',
            },
            phone: '',
            picture: '',
            status: 'Pending',
            role: 'user',
        });
        // generate a token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            env.JWT_SECRET,
            { expiresIn: env.ACCESS_TOKEN_EXPIRY }
        );

        user.token = token;
        user.password = undefined;

        res.status(StatusCodes.CREATED).json({
            message: 'Đăng ký thành công',
            user,
        });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Lỗi trong quá trình đăng ký',
            error: error.message,
        });
    }
};

const signupGoogle = async (req, res) => {
    const { token } = req.body;
    const payload = await verifyToken(token);

    const { email, name, picture, sub } = payload;
    try {
        // check if user already exists
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Người dùng tồn tại',
            });
        }

        // create a new user
        const user = await Users.create({
            name,
            email,
            password: sub,
            address: {
                street: '',
                city: '',
                country: '',
            },
            phone: '',
            picture,
            status: 'Active',
            role: 'user',
        });
        // generate a token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            env.JWT_SECRET,
            { expiresIn: env.ACCESS_TOKEN_EXPIRY }
        );

        user.token = token;
        user.password = undefined;

        res.status(StatusCodes.CREATED).json({
            message: 'Đăng ký thành công',
            user,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Lỗi trong quá trình đăng ký',
            error: error.message,
        });
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // all the data should exists
        if (!(email && password)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Tất cả các trường là bắt buộc',
            });
        }

        // check if user exists
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // generate a token
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                env.JWT_SECRET,
                { expiresIn: env.ACCESS_TOKEN_EXPIRY }
            );

            user.token = token;
            user.password = undefined;

            res.status(StatusCodes.OK).json({
                message: 'Đăng nhập thành công',
                user,
            });

        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Lỗi trong quá trình đăng nhập',
            error: error.message,
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // all the data should exists
        if (!email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Email là bắt buộc',
            });
        }

        // check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Người dùng không tồn tại',
            });
        }

        // Here you would typically send a reset password link to the user's email
        // For simplicity, we will just return a success message
        res.status(StatusCodes.OK).json({
            message: 'Đã gửi liên kết đặt lại mật khẩu đến email của bạn',
        });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Lỗi trong quá trình đặt lại mật khẩu',
            error: error.message,
        });
    }
};

module.exports = { signup, signin, forgotPassword, signupGoogle };