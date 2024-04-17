const Patient = require("../models/Patient");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

//create new patient
const createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const newPatient = await patient.save();
    res.status(StatusCodes.CREATED).json(newPatient);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

// get patient using patient id
const getSinglePatient = async (req, res) => {
  const { id: patientId } = req.params;
  console.log(patientId);
  try {
    const patient = await Patient.findOne({ patientId: patientId });
    if (!patient) {
      throw new CustomError.NotFoundError(
        `No patient with id : ${req.params.id}`
      );
    }
    res.status(StatusCodes.OK).json({ patient });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

//update patient using patient id
const updatePatient = async (req, res) => {
  const { id: patientId } = req.params;
  try {
    const patient = await Patient.findOneAndUpdate(
      { patientId: patientId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!patient) {
      throw new CustomError.NotFoundError(
        `No patient with id : ${req.params.id}`
      );
    }
    res.status(StatusCodes.OK).json({ patient });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

// delete patient from database
const deletePatient = async (req, res) => {
  const { id: patientId } = req.params;
  try {
    var patient = await Patient.findOneAndDelete({ patientId: patientId });
    if (!patient) {
      throw new CustomError.NotFoundError(
        `No patient with id : ${req.params.id}`
      );
    }
    patient.status = false;
    patient = await Patient.findOneAndUpdate({ patientId: patientId }, patient);
    res.status(StatusCodes.OK).json({ patient });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ status: true })
      .populate("treatmentHistory")
      .populate("prescriptions");
    res.status(StatusCodes.OK).json({ patients });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = {
  getAllPatients,
  createPatient,
  getSinglePatient,
  updatePatient,
  deletePatient,
};
