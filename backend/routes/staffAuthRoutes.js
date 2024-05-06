const express = require('express')
const router = express.Router()


const {
    
    
    staffLogin,
    verifystaff,
    staffLogout,
} = require('../controllers/staffAuthController')





router.get('/StaffDashboard',verifystaff,(req,res) =>{
    res.json({stat: "Success"})
  })




router.post('/staff/login', staffLogin)
router.post('/staff/logout', staffLogout)

module.exports = router