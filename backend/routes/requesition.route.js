const express = require('express');
const router = express.Router();

const { createRequesition, getAllRequesitions, getRequesitionsByPatient, deleteRequesition } = require('../controllers/requesition.controller');

router.route('/').post(createRequesition).get(getAllRequesitions);      // '/requesition'
router.route('/:id').get(getRequesitionsByPatient).delete(deleteRequesition);                          // '/requesition/:id'
module.exports = router;