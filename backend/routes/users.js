const express = require('express');
const router = express.Router();

// TODO заменить на add
const createUser = require('../controllers/users')

// TODO переименовать папку в employees
// /api/users/create
router.post('/create', createUser)

module.exports = router;