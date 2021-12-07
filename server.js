require('dotenv').config({path : './config.env'});
const express = require('express');
const app = express();
const dbConnection = require('./db');
const carRoute = require('./routes/carRoute');
const userRoute = require('./routes/userRoute');
const carBooingRoute = require('./routes/carBookingRoute');
const cors = require('cors');
const path = require('path')
const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())

//apis
app.use('/api/cars', carRoute);
app.use('/api/users', userRoute);
app.use('/api/bookings',carBooingRoute);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'build' ,'index.html'))
  })
}else{
  app.get('/', (req,res) =>{
    res.send('Api is Running')
  })
}
app.listen(PORT, ()=>{
  console.log(`server is lisenting on Port ${PORT}`)
})