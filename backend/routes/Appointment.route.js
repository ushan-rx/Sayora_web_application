const express = require('express');
const router = express.Router();
const AppoinmentController = require('../controllers/Appoinment.ctrl');


router.post('/addappointments', AppoinmentController.addAppoinment);

router.get('/appointments', AppoinmentController.getAppoinments);

router.get('/getappointments/:id', AppoinmentController.getAppoinmentByID);

router.put('/updateappointments/:id', AppoinmentController.updateAppoinment);

router.delete('/deleteappointments/:id', AppoinmentController.deleteAppoinment);

module.exports = router;




