const express = require('express');
const router = express.Router();

const{ createRegularPatient, getManyRegularPatients, deleteRegularPatient} = require('../controllers/regularPatient.controller');

router.route('/').post(createRegularPatient)    // '/regularPatient'
router.route('/:id').delete(deleteRegularPatient) // '/regularPatient/:id'
router.route('/doctor/:id').get(getManyRegularPatients); // '/regularPatient/doctor/:id'

module.exports = router;