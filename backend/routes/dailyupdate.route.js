const express = require('express');
const router = express.Router();

const{ createDailyUpdate, getAllDailyUpdates, getManyDailyUpdate} = require('../controllers/dailyupdate.controller');

router.route('/').post(createDailyUpdate).get(getAllDailyUpdates);      // '/dailyupdate'

router.route('/:id').get(getManyDailyUpdate); // '/dailyupdate/:id'

module.exports = router;