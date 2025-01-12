const express = require('express')
const router = express.Router()
const {all, add, single, remove, edit} = require('../controllers/departments')

router.get('/', all)
router.get('/:id', single)
router.post('/add', add)
router.delete('/remove/:id', remove)
router.put('/edit/:id', edit)

module.exports = router