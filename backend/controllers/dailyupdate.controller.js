const DailyUpdate = require('../models/DailyUpdates');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

//create new daily update
const createDailyUpdate = async (req, res) => {
  try {
    const dailyUpdate = new DailyUpdate(req.body);
    const newDailyUpdate = await dailyUpdate.save();
    res.status(StatusCodes.CREATED).json(newDailyUpdate);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const getAllDailyUpdates = async (req, res) => {
  try {
    const dailyUpdates = await DailyUpdate.find({})
    res.status(StatusCodes.OK).json({ dailyUpdates, count: dailyUpdates.length });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const getManyDailyUpdate = async (req, res) => {
  const {id: patientId} = req.params;
  console.log(patientId);
  try {
    const dailyUpdates = await DailyUpdate.find({patientId: patientId});
    if (!dailyUpdates) {  
      throw new CustomError.NotFoundError(
        `No daily updates for patient with id : ${req.params.id}`
      );
    }
    res.status(StatusCodes.OK).json({ dailyUpdates });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = { createDailyUpdate, getAllDailyUpdates, getManyDailyUpdate};