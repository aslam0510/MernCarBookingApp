const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

//login
router.post('/login', async (req,res) =>{
    const {username , password} = req.body;
    try {
      const user = await User.findOne({username, password});
      if(user) {
        res.send(user)
      }
      else{
        return res.status(400).json({message : 'Invalid Credentials'})
      }
    } catch (error) {
      return res.status(400).json(error)
    }
})

//register
router.post('/register', async (req,res) =>{
  const {userName} = req.body;
  const isUserExits = await User.findOne({userName});
  if(isUserExits){
    return res.status(400).json({message : 'User already exits, click on the below link to Login'})
  }
  try {
    const newUser = new User(req.body)
    await newUser.save();
    res.send({message:'User registered successfully'})
  } catch (error) {
    return res.status(400).json(error)
  }
})

module.exports = router;