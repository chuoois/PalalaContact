const express = require('express');
const router = express.Router();
const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.post('/auth/signup', authMiddleware.checkEmailExists, authController.signup);

module.exports = router;