const express = require('express');
const router = express.Router();

const{ createPrescription, getAllPrescriptions, getManyPrescription} = require('../controllers/prescription.controller');

router.route('/').post(createPrescription).get(getAllPrescriptions);      // '/prescription'

router.route('/:id').get(getManyPrescription); // '/prescription/:id'

module.exports = router;