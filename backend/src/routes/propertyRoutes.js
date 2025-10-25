const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getProperties, getProperty, create, update, remove } = require('../controllers/propertyController');
const { toggle } = require('../controllers/favoriteController');

const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getProperty);
router.post('/', auth, upload.array('images', 10), create);
router.put('/:id', auth, upload.array('images', 10), update);
router.delete('/:id', auth, remove);
router.post('/:id/favorite', auth, toggle);  // New endpoint

module.exports = router;