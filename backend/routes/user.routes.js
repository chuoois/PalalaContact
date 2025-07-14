const express = require('express');
const router = express.Router();
const { userController } = require('../controller');
const { authenticateToken } = require('../middleware/auth.middeware');

router.post('/change-password', authenticateToken, userController.changePassword);

module.exports = router;
