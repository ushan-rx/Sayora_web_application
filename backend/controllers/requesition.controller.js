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

const getRequesitionsByPatient = async (req, res) => {
  const { id: patientId } = req.params;
  try {
    const requesitions = await Requesition.find({ patientId: patientId });
    res.status(StatusCodes.OK).json({ requesitions, count: requesitions.length });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const deleteRequesition = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const requesition = await Requesition.findByIdAndDelete({ _id: _id });
    res.status(StatusCodes.OK).json({ requesition, count: requesition.length });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};
const updateRequesition = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const requesition = await Requesition.findByIdAndUpdate(_id, {
      is_uploaded: true,
    });
    res.status(StatusCodes.OK).json({ requesition, count: requesition.length });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const getManyRequesition = async (req, res) => {
  const { id: patientId } = req.params;
  //console.log(patientId);
  try {
    const requesitions = await Requesition.find({ patientId: patientId });
    if (!requesitions) {
      throw new CustomError.NotFoundError(
        `No daily updates for patient with id : ${req.params.id}`
      );
    }
    res.status(StatusCodes.OK).json({ requesitions });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = {
  createRequesition,
  getAllRequesitions,
  getRequesitionsByPatient,
  deleteRequesition,
  getManyRequesition,
  updateRequesition,
};
