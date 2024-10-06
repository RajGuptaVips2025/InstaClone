const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../middleware/authenticateToken');
const upload = require('../middleware/uploadMiddleware');

router.post('/post/upload', authenticateToken, upload, postController.createPost);
router.get('/getposts', authenticateToken, postController.getPosts);
router.get('/getpost/:id', authenticateToken, postController.getPost);
router.get('/like/:id', authenticateToken, postController.likePost);

module.exports = router;
