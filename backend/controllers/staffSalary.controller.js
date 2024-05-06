const StaffSalary = require("../models/staffSalary.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// CREATE a new salary record
const assignSalary = async (req, res) => {
    try {
        const newSalary = new StaffSalary(req.body);
        const savedSalary = await newSalary.save();
        res.status(StatusCodes.CREATED).json(savedSalary);
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

// READ all salary records
const getAllSalaries = async (req, res) => {
    try {
        const salaries = await StaffSalary.find();
        res.status(StatusCodes.OK).json({ salaries });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

// READ a single salary record by ID
const getSalaryById = async (req, res) => {
    const { id: salaryId } = req.params;
    try {
        const salary = await StaffSalary.findOne({ salaryId });
        if (!salary) {
            throw new CustomError.NotFoundError(`No salary record found with id: ${salaryId}`);
        }
        res.status(StatusCodes.OK).json({ salary });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

// UPDATE a salary record
const updateSalary = async (req, res) => {
    const { id: salaryId } = req.params;
    try {
        const updatedSalary = await StaffSalary.findOneAndUpdate(
            { salaryId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedSalary) {
            throw new CustomError.NotFoundError(`No salary record found with id: ${salaryId}`);
        }
        res.status(StatusCodes.OK).json({ salary: updatedSalary });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const getSalaryByStaffId = async (req, res) => {
    const { id: staffId } = req.params; // Extracting staffId from request parameters
    try {
        const salary = await StaffSalary.find({ staffId: staffId }); // Querying database for salary records
        if (salary.length === 0) { // Checking if no records found
            return res.status(StatusCodes.NOT_FOUND).json({ message: `No Salary records found for staff ID: ${staffId}` });
        }
        res.status(StatusCodes.OK).json({salary}); // Sending salary records if found
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message }); // Handling any errors
    }
};


// DELETE a salary record
const deleteSalary = async (req, res) => {
    const { id: salaryId } = req.params;
    try {
        const deletedSalary = await StaffSalary.findOneAndDelete({ salaryId });
        if (!deletedSalary) {
            throw new CustomError.NotFoundError(`No salary record found with id: ${salaryId}`);
        }
        res.status(StatusCodes.OK).json({ deleted: true });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

module.exports = {
    assignSalary,
    getAllSalaries,
    getSalaryById,
    updateSalary,
    getSalaryByStaffId,
    deleteSalary
};
