const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { env } = require('../configs/environment');
const { helpersformail } = require('../helpers');
const { OAuth2Client } = require('google-auth-library');
const { StatusCodes } = require('http-status-codes');
const {
    Users,
    OTP
} = require('../models');

const client = new OAuth2Client(env.VITE_GOOGLE_CLIENT_ID);

// Tạo OTP 6 số
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Gửi OTP đến email
const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Email là bắt buộc',
            });
        }

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Email đã được sử dụng',
            });
        }

        // Tạo OTP
        const otpCode = generateOTP();

        // Xóa OTP cũ nếu có (do unique constraint)
        await OTP.deleteOne({ email: email });

        // Lưu OTP vào database OTP
        await OTP.create({
            email: email,
            otpCode: otpCode,
            attempts: 0
        });

        // Gửi OTP qua email
        const emailHTML = helpersformail.getOTPEmailTemplate(email, otpCode);
        const emailResponse = await helpersformail.sendMail({
            email: email,
            subject: 'Mã xác thực OTP',
            html: emailHTML,
        });

        if (!emailResponse.success) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Lỗi trong quá trình gửi OTP',
                error: emailResponse.error,
            });
        }

        res.status(StatusCodes.OK).json({
            message: 'OTP đã được gửi đến email của bạn',
            email: email
        });

    } catch (error) {
        console.error('Error in sendOTP:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Lỗi trong quá trình gửi OTP',
            error: error.message,
        });
    }
};

const signup = async (req, res) => {
    try {
        const { name, email, password, comparePassword, otp } = req.body;

        // Kiểm tra tất cả các trường bắt buộc
        if (!(name && email && password && comparePassword && otp)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Tất cả các trường là bắt buộc (bao gồm OTP)',
            });
        }

        // Kiểm tra mật khẩu khớp
        if (password !== comparePassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Mật khẩu và xác nhận mật khẩu không khớp',
            });
        }

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Email đã được sử dụng',
            });
        }

        // Tìm OTP trong database
        const otpRecord = await OTP.findOne({
            email: email
        });

        if (!otpRecord) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Không tìm thấy yêu cầu OTP cho email này hoặc OTP đã hết hạn',
            });
        }

        // Kiểm tra số lần thử
        if (otpRecord.attempts >= 5) {
            // Xóa OTP đã quá số lần thử
            await OTP.deleteOne({ _id: otpRecord._id });
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'OTP đã bị khóa do nhập sai quá nhiều lần',
            });
        }

        // Kiểm tra OTP đúng
        if (otpRecord.otpCode !== otp) {
            // Tăng số lần thử
            await OTP.updateOne(
                { _id: otpRecord._id },
                { $inc: { attempts: 1 } }
            );

            const remainingAttempts = 5 - (otpRecord.attempts + 1);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: `OTP không đúng. Còn ${remainingAttempts} lần thử`,
            });
        }

        // Mã hóa mật khẩu
        const myEncPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
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
            status: 'Active',
            role: 'user',
        });

        // Xóa OTP sau khi đăng ký thành công
        await OTP.deleteOne({ _id: otpRecord._id });

        // Tạo token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            env.JWT_SECRET,
            { expiresIn: env.ACCESS_TOKEN_EXPIRY }
        );

        // Tạo object user để trả về (không bao gồm password)
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            picture: user.picture,
            status: user.status,
            role: user.role,
            token: token,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Đăng ký thành công',
            user: userResponse,
        });

    } catch (error) {
        console.error('Error in signup:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Lỗi trong quá trình đăng ký',
            error: error.message,
        });
    }
};

// Xác thực OTP (nếu cần endpoint riêng)
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Email và OTP là bắt buộc',
            });
        }

        const otpRecord = await OTP.findOne({
            email: email
        });

        if (!otpRecord) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Không tìm thấy yêu cầu OTP cho email này hoặc OTP đã hết hạn',
            });
        }

        // Kiểm tra số lần thử
        if (otpRecord.attempts >= 5) {
            // Xóa OTP đã quá số lần thử
            await OTP.deleteOne({ _id: otpRecord._id });
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'OTP đã bị khóa do nhập sai quá nhiều lần',
            });
        }

        if (otpRecord.otpCode !== otp) {
            // Tăng số lần thử
            await OTP.updateOne(
                { _id: otpRecord._id },
                { $inc: { attempts: 1 } }
            );

            const remainingAttempts = 5 - (otpRecord.attempts + 1);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: `OTP không đúng. Còn ${remainingAttempts} lần thử`,
            });
        }

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'OTP xác thực thành công',
            email: email
        });

    } catch (error) {
        console.error('Error in verifyOTP:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Lỗi trong quá trình xác thực OTP',
            error: error.message,
        });
    }
};

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

        // Tạo object user để trả về (không bao gồm password)
        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            googleId: newUser.googleId,
            address: newUser.address,
            phone: newUser.phone,
            picture: newUser.picture,
            status: newUser.status,
            role: newUser.role,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Đăng ký thành công với Google',
            user: userResponse,
        });

    } catch (error) {
        console.error('Error in signupGoogle:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
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

            // Tạo object user để trả về (không bao gồm password)
            const userResponse = {
                _id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
                picture: user.picture,
                status: user.status,
                role: user.role,
                token: token,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };

            res.status(StatusCodes.OK).json({
                success: true,
                message: 'Đăng nhập thành công',
                user: userResponse,
            });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng',
            });
        }

    } catch (error) {
        console.error('Error in signin:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Lỗi trong quá trình đăng nhập',
            error: error.message,
        });
    }
};

const signinGoogle = async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'ID token là bắt buộc',
            });
        }

        // Verify the ID token with Google
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: env.GOOGLE_CLIENT_ID,
        });

        const { email, name, picture, sub: googleId } = ticket.getPayload();

        // Check if user exists
        let user = await Users.findOne({ email });

        if (!user) {
            // Create new user if not exists
            user = await Users.create({
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
        }

        // Generate a token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            env.JWT_SECRET,
            { expiresIn: env.ACCESS_TOKEN_EXPIRY }
        );

        // Tạo object user để trả về (không bao gồm password)
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            picture: user.picture,
            status: user.status,
            role: user.role,
            token: token,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Đăng nhập Google thành công',
            user: userResponse,
        });

    } catch (error) {
        console.error('Error in signinGoogle:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Lỗi trong quá trình đăng nhập Google',
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
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Người dùng không tồn tại',
            });
        }

        // Tạo newPassword
        const newPassword = Math.random().toString(36).slice(-8);
        // Mã hóa mật khẩu mới
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Cập nhật mật khẩu mới cho người dùng
        await Users.updateOne({ email }, { password: hashedPassword });
        // Gửi email thông báo mật khẩu mới
        const emailHTML = helpersformail.getForgotPasswordEmailTemplate(email, newPassword);
        const emailResponse = await helpersformail.sendMail({
            email: email,
            subject: 'Mật khẩu mới',
            html: emailHTML,
        });
        if (!emailResponse.success) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Lỗi trong quá trình gửi email',
                error: emailResponse.error,
            });
        }
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Mật khẩu mới đã được gửi đến email của bạn',
        });

    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Lỗi trong quá trình đặt lại mật khẩu',
            error: error.message,
        });
    }
};

module.exports = {
    sendOTP,
    signup,
    signin,
    forgotPassword,
    signupGoogle,
    signinGoogle,
    verifyOTP
};