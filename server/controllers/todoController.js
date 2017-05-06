var ObjectId = require('mongodb').ObjectId
var Todo = require('../models/todo')
const methods = {}

methods.getAllTodos = function(req, res) {
  Todo.find(function(err, Todo) {
    if(err){
      console.log(err);
    } else {
      res.send(Todo)
    }
  })
}

methods.insertTodo = function(req, res){
  var todoInput = new Todo({
    member_id:req.body.member_id,
    memo:req.body.memo,
    is_complete:false
  })
  todoInput.save(function(err,todoInput){
    if(err){
      return console.log(err);
    } else {
      res.send(todoInput)
    }
  })
}

methods.updateTodo = function (req,res) {
  Todo.findById(req.params.id, function(err, result){
    if(!err){
      let update = {
        member_id:req.body.member_id || result.member_id,
        memo:req.body.memo || result.memo,
        is_complete:req.body.is_complete || result.is_complete
      }

      Todo.findByIdAndRemove(req.params.id, update, {new:true}, function(err, result){
        if(!err){
          res.send('update sukses')
        } else {
          res.send(err)
        }
      })
    } else {
      res.send(err)
    }
  })
}

methods.deleteTodo = function(req,res) {
  Todo.findByIdAndRemove(req.params.id, function(err, result){
    if(!err){
      res.send('berhasil hapus')
    } else {
      res.send(err)
    }
  })
}

module.exports = methods
