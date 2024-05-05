const express = require('express');
const router = express.Router();

const { getAllTreatmentHistory,
     createTreatmentHistory,
     getSingleTreatmentHistory,
     deleteTreatmentHistory,
     getFilteredTreatmentHistory,
     getTreatmentHistoryByPatient,
     getManyTreatmentHistory,
     getTreatmentHistoryByDoctor
    } = require('../controllers/treatmentHistory.controller');

router.route('/').post(createTreatmentHistory).get(getAllTreatmentHistory);      // '/doctor'

router.route('/:id').get(getSingleTreatmentHistory).delete(deleteTreatmentHistory) // '/doctor/:id';


// get all treatments using appointment id
router.route('/filter/:id').get(getFilteredTreatmentHistory)
// get all treatments using patient id
router.route('/patient/:id').get(getTreatmentHistoryByPatient)

// get all treatments using patient id
router.route('/patient/:id').get(getManyTreatmentHistory)

//get all treatments using doctor id
router.route('/doctor/:id').get(getTreatmentHistoryByDoctor)

module.exports = router;