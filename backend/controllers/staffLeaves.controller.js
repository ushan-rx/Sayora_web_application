const StaffLeaves = require("../models/staffLeaves.model"); // Corrected to use the proper model reference
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// CREATE a new leave request
const createLeaveRequest = async (req, res) => {
    try {
        const newLeave = new StaffLeaves(req.body);
        const savedLeave = await newLeave.save();
        res.status(StatusCodes.CREATED).json(savedLeave);
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};



  

// READ all leave requests
const getAllLeaves = async (req, res) => {
    try {
        const leaves = await StaffLeaves.find().sort({ createdAt: -1 }); 
        res.status(StatusCodes.OK).json({ leaves });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

// READ a single leave request by ID
const getLeaveById = async (req, res) => {
    const { id: leavesId } = req.params;
    try {
        const leave = await StaffLeaves.findOne({ leavesId: leavesId });
        if (!leave) {
            throw new CustomError.NotFoundError(`No leave request found with id: ${leavesId}`);
        }
        res.status(StatusCodes.OK).json({ leave });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};


// UPDATE a leave request
const updateLeaveRequest = async (req, res) => {
    const { id: leavesId } = req.params;
    try {
        const updatedLeave = await StaffLeaves.findOneAndUpdate({ leavesId: leavesId }, req.body, { new: true, runValidators: true });
        if (!updatedLeave) {
            throw new CustomError.NotFoundError(`No leave request found with id: ${leavesId}`);
        }
        res.status(StatusCodes.OK).json({ leave: updatedLeave });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const getLeavesByStaffId = async (req, res) => {
    const { id: staffId } = req.params;
    try {
        const leaves = await StaffLeaves.find({ staffId: staffId });
        if (leaves.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: `No leave requests found for staff ID: ${staffId}` });
        }
        res.status(StatusCodes.OK).json({ leaves });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};



const deleteLeaveRequest = async (req, res) => {
    const { id: leaveId } = req.params; 
    try {
       
        const deletedLeave = await StaffLeaves.findOneAndDelete({ leavesId: leaveId });
        if (!deletedLeave) {
            throw new CustomError.NotFoundError(`No leave request found with id: ${leaveId}`);
        }
        res.status(StatusCodes.OK).json({ deleted: true });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};



module.exports = {
    createLeaveRequest,
    getAllLeaves,
    getLeaveById,
    updateLeaveRequest,
    deleteLeaveRequest,
    getLeavesByStaffId
};
