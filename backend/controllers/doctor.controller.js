const Doctor = require("../models/doctor.model")

const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors')


const getAllDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find({status: true});       // status: true comes only if there is a status field for delete purposes
      res.status(StatusCodes.OK).json({doctors, count: doctors.length});
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }

  //create new doctor
  const createDoctor = async (req, res) => {
    try {
      const doctor = new Doctor(req.body);
      const newDoctor = await doctor.save();
      res.status(StatusCodes.CREATED).json(newDoctor);
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }

  // get doctor using doctor id
  const getSingleDoctor = async (req, res) => {
    const { id: doctorId } = req.params;
    try {
      const doctor = await Doctor.findOne({ doctorId: doctorId });
      if (!doctor) {
        throw new CustomError.NotFoundError(`No doctor with id : ${req.params.id}`);
      }
      res.status(StatusCodes.OK).json({doctor});
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }

  //update doctor using doctor id
  const updateDoctor = async (req, res) => {
    const { id: doctorId } = req.params;
    try {
      const doctor = await Doctor.findOneAndUpdate({ doctorId: doctorId }, req.body, 
        {  new: true, runValidators: true });
      if (!doctor) {  
        throw new CustomError.NotFoundError(`No doctor with id : ${req.params.id}`);
      }
      res.status(StatusCodes.OK).json({doctor});
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
}

// delete doctor from database
  // const deleteDoctor = async (req, res) => {
  //   const { id: doctorId } = req.params;
  //   try {
  //     const doctor = await Doctor.findOneAndDelete({ doctorId: doctorId });
  //     if (!doctor) {
  //       throw new CustomError.NotFoundError(`No doctor with id : ${req.params.id}`);
  //     }
  //     res.status(StatusCodes.OK).json({doctor});
  //   } catch (err) {
  //     res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  //   }
  // }


  // when deleting doctor only change status to false
  const deleteDoctor = async (req, res) => {
    const { id: doctorId } = req.params;
    try {
      var doctor = await Doctor.findOne({ doctorId: doctorId });

      if (!doctor) {
        throw new CustomError.NotFoundError(`No doctor with id : ${req.params.id}`);
      }
      doctor.status = false;
      doctor = await Doctor.findOneAndUpdate({ doctorId: doctorId }, doctor);
      res.status(StatusCodes.OK).json({doctor});
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }



  module.exports = {
    getAllDoctors,
    createDoctor,
    getSingleDoctor,
    updateDoctor,
    deleteDoctor,
  }