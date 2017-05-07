const mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema({
  username:String, // untuk login manual
  password:String, // untuk login manual
  first_name : String,
  last_name : String,
  member_id : String  //untuk fb
})

var User = mongoose.model('User', userSchema)

module.exports = User
