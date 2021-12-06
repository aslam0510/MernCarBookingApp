const mongoose = require('mongoose');
const dotenv = require('dotenv');

function connectDB(){
  const URL = process.env.MONGODB_URI || 'mongodb+srv://aslam05:aslam05@cluster0.xkgan.mongodb.net/carapp'
  mongoose.connect(URL,{useUnifiedTopology:true, useNewUrlParser:true});

  const connection = mongoose.connection;
  
  //if connected
  connection.on('connected',()=>console.log('Database Connected'));

  //if not connected
  connection.on('error',()=>console.log('Database not connected'))
}

connectDB();

module.exports = mongoose