const express = require('express');
const router = express.Router();

const { getAllTreatmentHistory,
     createTreatmentHistory,
     getSingleTreatmentHistory,
     deleteTreatmentHistory,
     getFilteredTreatmentHistory
    } = require('../controllers/treatmentHistory.controller');

router.route('/').post(createTreatmentHistory).get(getAllTreatmentHistory);      // '/doctor'

router.route('/:id').get(getSingleTreatmentHistory)      
        .delete(deleteTreatmentHistory);


// get all treatments using appointment id
router.route('/filter/:id').get(getFilteredTreatmentHistory)

module.exports = router;