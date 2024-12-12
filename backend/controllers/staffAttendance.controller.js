const StaffAttendance = require("../models/staffAttendance.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// CREATE a new attendance record
const markAttendance = async (req, res) => {
    try {
        const newAttendance = new StaffAttendance(req.body);
        const savedAttendance = await newAttendance.save();
        res.status(StatusCodes.CREATED).json(savedAttendance);
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};



const getAllAttendances = async (req, res) => {
    try {
        // Sort attendances by 'createdAt' in descending order so the most recent is first
        const attendances = await StaffAttendance.find().sort({ createdAt: -1 });
        res.status(StatusCodes.OK).json({ attendances });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

/*const getAllAttendances = async (req, res) => {
    try {
        const attendances = await StaffAttendance.find(); 
        res.status(StatusCodes.OK).json({ attendances });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};*/

// READ a single attendance record by ID
const getAttendanceById = async (req, res) => {
    const { id: attendanceId } = req.params;
    try {
        const attendance = await StaffAttendance.findOne({ attendanceID: attendanceId });
        if (!attendance) {
            throw new CustomError.NotFoundError(`No attendance record found with id: ${attendanceId}`);
        }
        res.status(StatusCodes.OK).json({ attendance });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

// UPDATE an attendance record
const updateAttendance = async (req, res) => {
    const { id: attendanceId } = req.params;
    try {
        const updatedAttendance = await StaffAttendance.findOneAndUpdate(
            { attendanceID: attendanceId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedAttendance) {
            throw new CustomError.NotFoundError(`No attendance record found with id: ${attendanceId}`);
        }
        res.status(StatusCodes.OK).json({ attendance: updatedAttendance });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const getAttendancesByStaffId = async (req, res) => {
    const { id: staffId } = req.params;
    try {
        const attendances = await StaffAttendance.find({ staffId: staffId });
        if (attendances.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: `No attendance records found for staff ID: ${staffId}` });
        }
        res.status(StatusCodes.OK).json({ attendances });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const deleteAttendance = async (req, res) => {
    const { id: attendanceId } = req.params;
    try {
        const deletedAttendance = await StaffAttendance.findOneAndDelete({ attendanceID: attendanceId });
        if (!deletedAttendance) {
            throw new CustomError.NotFoundError(`No attendance record found with id: ${attendanceId}`);
        }
        res.status(StatusCodes.OK).json({ deleted: true });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

module.exports = {
    markAttendance,
    getAllAttendances,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
    getAttendancesByStaffId
};
