var ObjectId = require('mongodb').ObjectId
var User = require('../models/user')
var passwordHash = require('password-hash')
var jwt = require('jsonwebtoken')
const methods = {}

methods.getId = function(req, res){
  jwt.verify(req.headers.token, 'secret', function(err, decoded){
    if(!err){
      // console.log(decoded._doc._id)
      res.send(decoded._doc._id)
    } else {
      console.log('masuk else');
    }
  })
}

methods.getAllUsers = function(req, res) {
  User.find(function(err, User) {
    if(err){
      console.log(err);
    } else {
      res.send(User)
    }
  })
}

//INSERT LOCAL
methods.insertUser = function(req, res){
  var userInput = new User({
    username:req.body.username, // untuk login manual
    password:passwordHash.generate(req.body.password), // untuk login manual
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    member_id:req.body.member_id, // untuk fb
  })
  userInput.save(function(err,userInput){
    if(err){
      return console.log(err);
    } else {
      res.send(userInput)
    }
  })
}

//INSERT FB
methods.fbLogin = function(req, res){
  console.log(req.body.member_id);
  //PERTAMA LOGIN, ID LANGSUNG DIBUAT
  // User.findOne({member_id:req.body.member_id},function(err, result) {
  //   if(result == null){
  //     var userInput = new User({
  //       member_id:req.body.member_id
  //     })
  //     userInput.save(function(err,userInput){
  //       if(err){
  //         return console.log(err);
  //       } else {
  //         res.send(userInput)
  //       }
  //     })
  //   } else {
  //     console.log('belum');
  //   }
  // })
}

//INSERT FB SUKSES
// methods.fbLogin = function(req, res){
//   console.log(req.body.member_id);
//   //PERTAMA LOGIN, ID LANGSUNG DIBUAT
//   User.find({member_id:req.body.member_id},function(err, result) {
//     let a = result.length
//     if(a == 0){
//       var userInput = new User({
//         member_id:req.body.member_id
//       })
//       userInput.save(function(err,userInput){
//         if(err){
//           return console.log(err);
//         } else {
//           res.send(userInput)
//         }
//       })
//     } else {
//       console.log('belum');
//     }
//   })
// }


//login local
methods.signIn = function (username, password, next) {
  var getUser = User.findOne({username : username})
  getUser.exec(function(err, user){
    if(passwordHash.verify(password, user.password)){
      let User = {
        id:user.id,
        username:user.username,
        first_name:user.first_name,
        last_name:user.last_name
      }
      let token = jwt.sign(user, 'secret')
       next(null, {message: 'Berhasil Login', token })
    } else {
      next(null, {message: 'Password Salah'})
    }
  })
}


module.exports = methods
