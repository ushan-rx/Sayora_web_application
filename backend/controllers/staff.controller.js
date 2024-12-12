const Staff = require("../models/staff.model"); // Renamed from 'staff' to 'Staff'

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

//create new staff member
const createStaff = async (req, res) => {
  try {
    const newStaff = new Staff(req.body); 
    const savedStaff = await newStaff.save();
    res.status(StatusCodes.CREATED).json(savedStaff);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

// get staff member by id
const getSingleStaff = async (req, res) => {
  const { id: staffId } = req.params;
  try {
    const foundStaff = await Staff.findOne({ staffId: staffId }); 
    if (!foundStaff) {
      throw new CustomError.NotFoundError(`No staff with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ staff: foundStaff });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

//update staff member using staff id
const updateStaff = async (req, res) => {
  const { id: staffId } = req.params;
  try {
    const updatedStaff = await Staff.findOneAndUpdate(
      { staffId: staffId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStaff) {
      throw new CustomError.NotFoundError(`No staff with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ staff: updatedStaff });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

// delete staff from database
const deleteStaff = async (req, res) => {
  const { id: staffId } = req.params;
  try {
    const deletedStaff = await Staff.findOneAndDelete({ staffId: staffId });
    if (!deletedStaff) {
      throw new CustomError.NotFoundError(`No staff with id : ${req.params.id}`);
    }
    deletedStaff.status = false;
    const updatedStaff = await deletedStaff.save();
    res.status(StatusCodes.OK).json({ staff: updatedStaff });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const getAllStaff = async (req, res) => {
  try {
    const allStaff = await Staff.find({ Status: 'Active' });
    res.status(StatusCodes.OK).json({ staffs: allStaff });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const getActiveStaffCount = async (req, res) => {
  try {
    const count = await Staff.countDocuments({ Status: 'Active' });
    res.status(StatusCodes.OK).json({ count });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = {
  getAllStaff,
  createStaff,
  getSingleStaff,
  updateStaff,
  deleteStaff,
  getActiveStaffCount,
};
