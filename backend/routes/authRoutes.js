const express = require('express')
const router = express.Router()


const {
    // register,
    register1,
    login,
    verifypatient,
    verifydoctor,
    logout
} = require('../controllers/authController')


const { registerUser } = require('../controllers/user.controller');

// router.post('/register', register)
router.post('/register1', register1)

router.get('/PatientDashboard',verifypatient,(req,res) =>{
    res.json({stat: "Success"})
  })

router.get('/DoctorDashboard',verifydoctor,(req,res) =>{
    res.json({stat: "Success"})
  })

  // Register user route
  router.post('/register/:tempId', registerUser);

router.post('/login', login)
router.post('/logout', logout)

module.exports = router