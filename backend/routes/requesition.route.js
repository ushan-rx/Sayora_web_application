const express = require('express');
const router = express.Router();

const { createRequesition, getAllRequesitions } = require('../controllers/requesition.controller');

router.route('/').post(createRequesition).get(getAllRequesitions);      // '/requesition'

module.exports = router;