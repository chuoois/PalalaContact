const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const contactRoutes = require('./contact.routes');
const userRoutes = require('./user.routes');

router.use(authRoutes);
router.use(contactRoutes);
router.use(userRoutes);

module.exports = router;