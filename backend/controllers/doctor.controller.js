const Doctor = require("../models/doctor.model")

const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors')


const getAllDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find({});
      res.status(StatusCodes.OK).json({doctors, count: doctors.length});
    } catch (err) {
        throw new CustomError.NotFoundError(`No doctors found :`+ err.message);
    }
  }

  const createDoctor = async (req, res) => {
    try {
      const doctor = new Doctor(req.body);
      const newDoctor = await doctor.save();
      res.status(StatusCodes.CREATED).json(newDoctor);
    } catch (err) {
      throw new CustomError.BadRequestError(err.message);
    }
  }


  module.exports = {
    getAllDoctors,
    createDoctor,
  }