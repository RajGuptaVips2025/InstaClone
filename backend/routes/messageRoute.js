const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authenticateToken = require('../middleware/authenticateToken');

// One-to-One Message Routes
router.post('/send/:id', authenticateToken, messageController.sendMessage); // Send message to specific user
router.get('/getMessage/:id', authenticateToken, messageController.getMessage); // Get message history with a specific user

// Group Message Routes
router.post('/group/create', authenticateToken, messageController.createGroup); // Create a group
router.get('/group/getgroupsforuser', authenticateToken, messageController.getGroupsForUser);
router.post('/group/:groupId/sendMessage', authenticateToken, messageController.sendMessageToGroup); // Send message to group
router.post('/group/:groupId/join', authenticateToken, messageController.joinGroup); // Join a group
router.post('/group/:groupId/leave', authenticateToken, messageController.leaveGroup); // Leave a group

module.exports = router;
