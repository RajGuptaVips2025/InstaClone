const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');
const upload = require('../middleware/uploadMiddleware'); // Import the updated middleware

router.post('/edit/:id', authenticateToken, upload, userController.updateProfile);
router.get('/profile/:id', authenticateToken, userController.getProfile);
router.get('/profiles/:id', userController.getAllUsers);
// router.get('/followOrUnfollow/:id',authenticateToken, userController.followOrUnfollow);
router.put('/followOrUnfollow/:id',authenticateToken, userController.followOrUnfollow);


module.exports = router;

