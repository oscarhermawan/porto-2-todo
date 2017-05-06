var ObjectId = require('mongodb').ObjectId
var User = require('../models/user')
const methods = {}

methods.getAllUsers = function(req, res) {
  User.find(function(err, User) {
    if(err){
      console.log(err);
    } else {
      res.send(User)
    }
  })
}

methods.insertUser = function(req, res){
  var userInput = new User({
    member_id:req.body.member_id,
    memo:req.body.memo,
    is_complete:false
  })
  userInput.save(function(err,userInput){
    if(err){
      return console.log(err);
    } else {
      res.send(userInput)
    }
  })
}

module.exports = methods
