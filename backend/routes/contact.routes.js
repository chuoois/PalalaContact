const express = require('express');
const router = express.Router();
const { contactsController } = require('../controller');
const { authenticateToken } = require('../middleware/auth.middeware');

router.get('/contact/list', authenticateToken, contactsController.getContactbyUserId);
router.get('/contact/details/:id', authenticateToken, contactsController.getContactdetails);
router.put('/contact/toggle-favorite/:id', authenticateToken, contactsController.togleFavorite);
router.delete('/contact/delete/:id', authenticateToken, contactsController.deleteContact);
router.post('/contact/create', authenticateToken, contactsController.createContact);
router.put('/contact/update/:id', authenticateToken, contactsController.updateContact);

module.exports = router;