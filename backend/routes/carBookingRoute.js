const express = require('express');
const router = express.Router();
const CarBooking = require('../models/carBookingModel');
const Car = require('../models/carModel');
const stripe = require('stripe')('sk_test_51K3LIzSHr4zH49FNV6RvajQeJyzPBAXMt8CFBefzta8ZKKLl1DYDMM2zR8AqRSY30roGz3WibK01NamZeJhs77Q900mXZIMj1R');
const {v4 : uuidv4} = require('uuid');


router.post('/bookCar', async (req,res) =>{
  const {token} = req.body;
  try {
      const customer = await stripe.customers.create({
        email : token.email,
        source :  token.id
      })
    
    const payment = await stripe.charges.create({
      amount : req.body.totalAmount * 100,
      currency : 'INR',
      customer : customer.id,
      receipt_email : token.email
    },{
      idempotencyKey : uuidv4()
    });
    console.log(payment);
    if(payment){
      req.body.transcationId = payment.source.id
      const newBooking = new CarBooking(req.body);
      await newBooking.save();
      const car = await Car.findOne({_id:req.body.car});
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);
      await car.save();
      res.json({message: 'Your Booking is Sucessfull'})
    }else{
      return res.status(400).json(error)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
})

router.get('/getallbookings', async (req,res) =>{
  try {
    const bookings = await CarBooking.find().populate('car');
    res.send(bookings)
  } catch (error) {
    return res.status(400).json(error)
  }
})

module.exports = router;