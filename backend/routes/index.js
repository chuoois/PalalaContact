const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const contactRoutes = require('./contact.routes');

router.use(authRoutes);
router.use(contactRoutes);

module.exports = router;