const express = require('express');
const router = express.Router();

const { createRequesition, getAllRequesitions, getRequesitionsByPatient, deleteRequesition, getManyRequesition, updateRequesition } = require('../controllers/requesition.controller');

router.route('/').post(createRequesition).get(getAllRequesitions);      // '/requesition'
router.route('/:id').get(getRequesitionsByPatient).delete(deleteRequesition).put(updateRequesition);                          // '/requesition/:id'

// get all treatments using patient id
router.route('/patient/:id').get(getManyRequesition);

module.exports = router;