const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
mongoose.connect('mongodb://localhost/todos', (err)=>{
  if(err){
    console.log(err);
  } else {
    console.log("Connect");
  }
})

var users = require('./routes/users')
var todos = require('./routes/todos')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.use('/users', users)
app.use('/todos', todos)


app.listen(3000)
module.exports = app
