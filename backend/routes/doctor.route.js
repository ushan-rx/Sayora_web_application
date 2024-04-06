const express = require('express');
const router = express.Router();

const { getAllDoctors,
     createDoctor,
     getSingleDoctor,
     updateDoctor,
     deleteDoctor

    } = require('../controllers/doctor.controller');

router.route('/').post(createDoctor).get(getAllDoctors);      // '/doctor'

router.route('/:id').get(getSingleDoctor)      // '/doctor/DOC00001'
        .put(updateDoctor)
        .delete(deleteDoctor);

module.exports = router;
