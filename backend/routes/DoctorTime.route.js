const express = require('express');
const router = express.Router();
const DoctorAvailableTimeController = require('../controllers/DoctorTime.ctrl.js');


router.post('/add', DoctorAvailableTimeController.addDoctorAvailableTime);

// GET /doctorAvailableTimes
router.get('/getAll', DoctorAvailableTimeController.getDoctorAvailableTimes);

// GET /doctorAvailableTimes/:id
router.get('/get/:id', DoctorAvailableTimeController.getDoctorAvailableTimeByID);

// PUT /doctorAvailableTimes/:id
router.put('/update/:id', DoctorAvailableTimeController.updateDoctorAvailableTime);

// DELETE /doctorAvailableTimes/:id
router.delete('/delete/:id', DoctorAvailableTimeController.deleteDoctorAvailableTime);

module.exports = router;
