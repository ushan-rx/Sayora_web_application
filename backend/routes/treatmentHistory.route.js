const express = require('express');
const router = express.Router();

const { getAllTreatmentHistory,
     createTreatmentHistory,
     getSingleTreatmentHistory,
     deleteTreatmentHistory,
     getFilteredTreatmentHistory,
     getManyTreatmentHistory
    } = require('../controllers/treatmentHistory.controller');

router.route('/').post(createTreatmentHistory).get(getAllTreatmentHistory);      // '/doctor'

router.route('/:id').get(getSingleTreatmentHistory).delete(deleteTreatmentHistory) // '/doctor/:id';


// get all treatments using appointment id
router.route('/filter/:id').get(getFilteredTreatmentHistory)

// get all treatments using patient id
router.route('/patient/:id').get(getManyTreatmentHistory)

module.exports = router;