const mongoose = require('mongoose');
require('dotenv').config({path : './config.env'});

function connectDB(){
  // for mongodb compass
  // 'mongodb+srv://aslam05:aslam05@cluster0.xkgan.mongodb.net/carapp'
  
  const URL = 'mongodb+srv://aslam05:aslam05@cluster0.xkgan.mongodb.net/carapp?retryWrites=true&w=majority'
  mongoose.connect(process.env.MONGO_URI || URL,{useUnifiedTopology:true, useNewUrlParser:true});

  const connection = mongoose.connection;
  
  //if connected
  connection.on('connected',()=>console.log('Database Connected'));

  //if not connected
  connection.on('error',()=>console.log('Database not connected'))
}

connectDB();

module.exports = mongoose