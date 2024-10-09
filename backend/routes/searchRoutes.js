const express = require('express');
const {searchUsers} = require('../controllers/searchController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.get('/users',authenticateToken, searchUsers);

module.exports = router;