const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName : {type:String, required:true},
  password : {type:String, required:true}
})

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;