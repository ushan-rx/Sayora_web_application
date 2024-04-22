const express = require('express');
const router = express.Router();

const{ createDailyUpdate, getAllDailyUpdates, getManyDailyUpdate, deleteDailyUpdate} = require('../controllers/dailyupdate.controller');

router.route('/').post(createDailyUpdate).get(getAllDailyUpdates);      // '/dailyupdate'

router.route('/:id').get(getManyDailyUpdate).delete(deleteDailyUpdate); // '/dailyupdate/:id'

module.exports = router;