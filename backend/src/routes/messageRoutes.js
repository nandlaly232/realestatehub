const express = require('express');
const authenticateToken = require('../middleware/auth');
const { getMessages, send } = require('../controllers/messageController');

const router = express.Router();

router.get('/', authenticateToken, getMessages);
router.post('/', authenticateToken, send);

module.exports = router;