const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const ctrl = require('../controllers/propertyController');

const router = express.Router();

router.get('/', ctrl.getProperties);
router.get('/:id', ctrl.getProperty);
router.post('/', auth, upload.array('images', 10), ctrl.createProperty);
router.put('/:id', auth, upload.array('images', 10), ctrl.updateProperty);
router.delete('/:id', auth, ctrl.deleteProperty);

module.exports = router;