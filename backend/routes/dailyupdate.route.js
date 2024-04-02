const express = require('express');
const router = express.Router();

const{ createDailyUpdate, getAllDailyUpdates } = require('../controllers/dailyupdate.controller');

router.route('/').post(createDailyUpdate).get(getAllDailyUpdates);      // '/dailyupdate'

module.exports = router;