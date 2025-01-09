const express = require('express');
const router = express.Router();

const createUser = require('../controllers/users')

// /api/users/create
router.post('/create', createUser)

module.exports = router;