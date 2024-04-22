const express = require('express');
const router = express.Router();

const { getAllReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport,
    getManyReport
} = require('../controllers/report.controller');


router.route('/').get(getAllReports).post(createReport);      // '/report'

router.route('/:id').get(getReportById)
        .put(updateReport)
        .delete(deleteReport);

        // get all treatments using patient id
router.route('/patient/:id').
get(getManyReport);
module.exports = router;