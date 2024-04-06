const express = require('express');
const router = express.Router();

const { getAllReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
} = require('../controllers/report.controller');


router.route('/').get(getAllReports).post(createReport);      // '/report'

router.route('/:id').get(getReportById)
        .put(updateReport)
        .delete(deleteReport);


module.exports = router;