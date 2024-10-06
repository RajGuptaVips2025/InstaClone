const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/send/:id', authenticateToken, messageController.sendMessage);
router.get('/getMessage/:id', authenticateToken, messageController.getMessage);

module.exports = router;