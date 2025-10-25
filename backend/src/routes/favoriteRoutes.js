const express = require('express');
const authenticateToken = require('../middleware/auth');
const { getUserFavorites, addToFavorites, removeFromFavorites } = require('../controllers/favoriteController');

const router = express.Router();

router.get('/', authenticateToken, getUserFavorites);
router.post('/:propertyId', authenticateToken, addToFavorites);
router.delete('/:propertyId', authenticateToken, removeFromFavorites);

module.exports = router;