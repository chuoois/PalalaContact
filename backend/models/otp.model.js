const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otpCode: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // Tự động xóa sau 5 phút (300 giây)
    },
    attempts: {
        type: Number,
        default: 0,
        max: 5 // Giới hạn 5 lần thử
    }
});

const OTP = mongoose.model('OTP', otpSchema, 'otps');

module.exports = OTP;