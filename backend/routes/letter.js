const express = require('express');
const router = express.Router();
const send = require('../controllers/letter')

// /api/letter
router.post('/', send)

module.exports = router