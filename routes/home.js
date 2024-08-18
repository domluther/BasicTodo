const express = require('express');
const router = express.Router();
const { getIndex } = require('../controllers/home');

// GET / -> return index.html
router.get('/', getIndex);

// Export the router
module.exports = router;
