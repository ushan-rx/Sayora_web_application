const express = require('express');
//const router = express.Router();
const { v4: uuidv4 } = require('uuid');
//const { v4: uuidv4 } = require('uuidv4');
//const bcrypt = require('bcryptjs');
const TempUser = require('../models/tempUser.model');
const User = require('../models/User');
const sendEmail = require('../utills/emailSender');


const addTempUser = async (req, res) => {
    try {
      const { name, email, userType,userRole } = req.body;
  
      //Check if email already exists in User collection
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already has an account' });
      }
  
      const tempUserId = uuidv4();
      const newTempUser = new TempUser({ tempUserId, name, email, userType,userRole});
      await newTempUser.save();
      await sendEmail(name,userType,userRole,email, tempUserId);
      res.status(201).json({ message: 'Temporary user created, confirmation email sent.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding tempuser' });
  }
  };
  
  module.exports = {
    // register
    addTempUser

  };