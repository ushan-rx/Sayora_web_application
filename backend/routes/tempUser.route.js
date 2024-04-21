// Initilize express router
const express = require('express')
const router = express.Router()


const {
    
    addTempUser

} = require('../controllers/tempUser.controller')

//router.post('/add',addTempUser);
    

router.post('/add',addTempUser,(req,res) =>{
res.json({stat: "Success"})
    
})







module.exports = router