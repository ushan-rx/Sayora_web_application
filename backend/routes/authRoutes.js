const express = require('express')
const router = express.Router()


const {
    // register,
    login,
    verifypatient,
    verifydoctor,
    logout
} = require('../controllers/authController')

// router.post('/register', register)

router.get('/PatientDashboard',verifypatient,(req,res) =>{
    res.json({stat: "Success"})
  })

router.get('/DoctorDashboard',verifydoctor,(req,res) =>{
    res.json({stat: "Success"})
  })

router.post('/login', login)
router.post('/logout', logout)

module.exports = router