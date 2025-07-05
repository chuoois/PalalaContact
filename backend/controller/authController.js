const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { env } = require('../configs/environment');
const { helpersformail } = require('../helpers');
const { OAuth2Client } = require('google-auth-library');
const { StatusCodes } = require('http-status-codes');
const {
    Users
} = require('../models');

const client = new OAuth2Client(env.VITE_GOOGLE_CLIENT_ID);

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
        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Người dùng đã tồn tại',
            });
        }

        // encrypt the password
        const myEncPassword = await bcrypt.hash(password, 10);
        // generate a verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
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
            verificationToken,
            verificationTokenExpiry
        });
        // create verification link
        const verificationLink = `${env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;
        //send verification email
        const emailSent = await helpersformail.getVerificationEmailTemplate(name, verificationLink);
        const emailResponse = await helpersformail.sendMail({
            email: user.email,
            subject: 'Xác thực tài khoản',
            html: emailSent,
        });

        if (!emailResponse.success) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Lỗi trong quá trình tạo tài khoản',
                error: emailResponse.error,
            });
        }

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

const verifyEmail = async (req, res) => {
    try {
        const { token, email } = req.query

        if (!token || !email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Token và email là bắt buộc",
            })
        }

        // find user with verification token
        const user = await Users.findOne({
            email: decodeURIComponent(email),
            verificationToken: token,
            verificationTokenExpiry: { $gt: new Date() },
        })
        console.log("user", user)

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Token xác nhận không hợp lệ hoặc đã hết hạn",
            })
        }

        // update user status
        user.status = "Active"
        user.verificationToken = undefined
        user.verificationTokenExpiry = undefined
        await user.save()

        res.status(StatusCodes.OK).json({
            message: "Xác nhận email thành công! Tài khoản của bạn đã được kích hoạt.",
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Lỗi trong quá trình xác nhận email",
            error: error.message,
        })
    }
}

const signupGoogle = async (req, res) => {
    try {
        const { tokenId } = req.body;

        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: env.VITE_GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;

        // Check if user already exists
        const existingUser = await Users.findOne({
            $or: [
                { email: email },
                { googleId: googleId }
            ]
        });

        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Người dùng đã tồn tại',
            });
        }

        // Create new user with Google data
        const newUser = await Users.create({
            name,
            email,
            googleId,
            password: '',
            address: {
                street: '',
                city: '',
                country: '',
            },
            phone: '',
            picture: picture || '',
            status: 'Active',
            role: 'user',
        });

        res.status(StatusCodes.CREATED).json({
            message: 'Đăng ký thành công với Google',
            user: newUser,
        });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Lỗi trong quá trình đăng ký với Google',
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
        const user = await Users.findOne({ email });

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
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'Email hoặc mật khẩu không đúng',
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
        const user = await Users.findOne({ email }); // Fixed: Users instead of User

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

module.exports = {
    signup,
    signin,
    forgotPassword,
    signupGoogle,
    verifyEmail
};