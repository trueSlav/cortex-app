const express = require('express');
const router = express.Router();

router.get('/', () => {console.log('get all employees')})
router.get('/:id', () => {console.log('get an employee by id')})
router.post('/add', () => {console.log('add employee')})
router.delete('/remove/:id', () => {console.log('remove an employee by id')})
router.put('/edit/:id', () => {console.log('edit an employee by id')})

module.exports = router;