const RegularPatient = require('../models/regularPatients.model');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');


//create new regular patient
const createRegularPatient = async (req, res) => {
  try {
    const regularPatient = new RegularPatient(req.body);
    const newRegularPatient = await regularPatient.save();
    res.status(StatusCodes.CREATED).json(newRegularPatient);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

//get regular patients by doctor id
const getManyRegularPatients = async (req, res) => {
  const {id: doctorId} = req.params;
  try {
    const regularPatients = await RegularPatient.find({doctorId: doctorId}).populate('patient');
    if (!regularPatients) {  
      throw new CustomError.NotFoundError(
        `No regular patients for doctor with id : ${req.params.id}`
      );
    }
    res.status(StatusCodes.OK).json({ regularPatients });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};


// delete regular patient
const deleteRegularPatient = async (req, res) => {
  const {id: patientId} = req.params;
  try {
    const regularPatient = await RegularPatient.findByIdAndDelete(patientId);
    if (!regularPatient) {
      throw new CustomError.NotFoundError(
        `No regular patient with id : ${req.params.id}`
      );
    }
    res.status(StatusCodes.OK).send();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};


module.exports = { createRegularPatient, getManyRegularPatients, deleteRegularPatient};