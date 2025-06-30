const express = require('express');
const router = express.Router();
const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

// Public routes 
router.post('/auth/signup', authController.signup);
router.post('/auth/signin', authController.signin);
router.post('/auth/signup-google', authController.signupGoogle);

module.exports = router;