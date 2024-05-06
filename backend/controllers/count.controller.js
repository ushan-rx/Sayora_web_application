const Staff = require("../models/staff.model");
const Patient = require("../models/Patient");
const Doctor = require("../models/doctor.model");
const Leaves = require("../models/staffLeaves.model");
const Products = require("../models/Product");
const Appz = require("../models/Appoinment");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");



const StaffCount = async (req, res) => {
  try {
    const count = await Staff.countDocuments({ Status: 'Active' });
    res.status(StatusCodes.OK).json({ count });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const PatientCount = async (req, res) => {
    try {
      const count = await Patient.countDocuments({});
      res.status(StatusCodes.OK).json({ count });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  };

    const DoctorCount = async (req, res) => {
        try {
        const count = await Doctor.countDocuments({});
        res.status(StatusCodes.OK).json({ count });
        } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
        }
    };
    
    const PendingLeaves = async (req, res) => {
        try {
          const count = await Leaves.countDocuments({ status: 'pending' });
          res.status(StatusCodes.OK).json({ count });
        } catch (err) {
          res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
        }
      };


      const ProductCount = async (req, res) => {
        try {
          const count = await Products.countDocuments({});
          res.status(StatusCodes.OK).json({ count });
        } catch (err) {
          res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
        }
      };

      const AppointmentCount = async (req, res) => {
        try {
          const count = await Appz.countDocuments({});
          res.status(StatusCodes.OK).json({ count });
        } catch (err) {
          res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
        }
      };
    
module.exports = {
  StaffCount,
  ProductCount,
  PatientCount,
  DoctorCount,
  PendingLeaves,
  AppointmentCount,
  
};
