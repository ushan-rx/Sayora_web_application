const Prescription = require('../models/prescription.model');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

//create new prescription
const createPrescription = async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    const newPrescription = await prescription.save();
    res.status(StatusCodes.CREATED).json(newPrescription);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({})
    res.status(StatusCodes.OK).json({ prescriptions, count: prescriptions.length });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const getManyPrescription = async (req, res) => {
  const {id: patientId} = req.params;
  console.log(patientId);
  try {
    const prescriptions = await Prescription.find({patientId: patientId});
    if (!prescriptions) {  
      throw new CustomError.NotFoundError(
        `No prescriptions for patient with id : ${req.params.id}`
      );
    }
    res.status(StatusCodes.OK).json({ prescriptions });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = { createPrescription, getAllPrescriptions, getManyPrescription};