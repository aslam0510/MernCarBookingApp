const express = require('express');
const router = express.Router();
const Car = require('../models/carModel');

router.get('/getAllCars', async (req, res) => {
  try{
    const cars = await Car.find();
    res.send(cars);
  }catch(error){
    return res.status(400).json(error)
  }
});

router.post('/addNewCar', async (req, res) => {
  try{
    const newCar = new Car(req.body);
    await newCar.save()
    res.send(newCar);
  }catch(error){
    return res.status(400).json(error)
  }
});

router.post('/editCar', async (req, res) => {
  try{
    const car = await Car.findOne({_id : req.body._id});
    car.name = req.body.name
    car.carImg = req.body.carImg
    car.feulType = req.body.feulType
    car.rentPerHour = req.body.rentPerHour
    car.capacity = req.body.capacity

    await car.save()

    res.send({message : 'Car updated Successfully'});
  }catch(error){
    return res.status(400).json(error)
  }
});

router.post('/deleteCar', async (req, res) => {
  try{
    const car = await Car.findOneAndDelete({_id : req.body.carId})
    res.send({message : 'Car deleted Successfully'});
  }catch(error){
    return res.status(400).json(error)
  }
});
  

module.exports = router;
