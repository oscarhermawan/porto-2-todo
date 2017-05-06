var express = require('express')
var api = require('../controllers/todoController')
var router = express.Router();

router.get('/', api.getAllTodos)
router.post('/', api.insertTodo)
router.delete('/:id', api.deleteTodo)
router.put('/:id', api.updateTodo)


module.exports = router
