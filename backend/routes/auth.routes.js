const express = require('express');
const router = express.Router();
const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

// Public routes 
router.post('/auth/signup', authController.signup);
router.post('/auth/signin', authController.signin);
router.post('/auth/signup-google', authController.signupGoogle);
router.post('/auth/signin-google', authController.signinGoogle);

// OTP routes
router.post('/auth/send-otp', authController.sendOTP);
router.post('/auth/verify-otp', authController.verifyOTP);

// Password reset routes
router.post('/auth/forgot-password', authController.forgotPassword);

module.exports = router;