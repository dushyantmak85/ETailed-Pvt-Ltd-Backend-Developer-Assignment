// User model file

const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({
  email:String,
  password:String, 
  name:String
});

module.exports = mongoose.model("User", UserSchema);
