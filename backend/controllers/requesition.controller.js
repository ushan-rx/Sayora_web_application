const Requesition = require('../models/requesition');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

//create new requesition
const createRequesition = async (req, res) => {
  try {
    const requesition = new Requesition(req.body);
    const newRequesition = await requesition.save();
    res.status(StatusCodes.CREATED).json(newRequesition);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const getAllRequesitions = async (req, res) => {
  try {
    const requesitions = await Requesition.find({})
    res.status(StatusCodes.OK).json({ requesitions, count: requesitions.length });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = { createRequesition, getAllRequesitions};