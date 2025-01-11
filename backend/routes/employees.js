const express = require('express');
const router = express.Router();
const {all, single, add, remove, edit} = require('../controllers/employees')

router.get('/', all)
router.get('/:id', single)
router.post('/add', add)
router.delete('/remove/:id', remove)
router.put('/edit/:id', edit)

module.exports = router;