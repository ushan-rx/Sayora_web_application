const Report = require('../models/report.model');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors')


// Get all reports
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(StatusCodes.OK).json(reports);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Get a single report by ID
const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
        throw new CustomError.NotFoundError(`No report with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json(report);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

// Create a new report
const createReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    const savedReport = await report.save();
    res.status(StatusCodes.CREATED).json(savedReport);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

// Update a report by ID
const updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!report) {
        throw new CustomError.NotFoundError(`No Report with id : ${req.params.id}`);
    }
    res.status(200).json({report});
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

// Delete a report by ID
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
        throw new CustomError.NotFoundError(`No report with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({report});
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const getReportByPatient = async (req, res) => {
  const { id: patientId } = req.params;
  console.log(patientId);
  try {
    const report = await Report.find({patientId : req.params.id});
    if (!report) {
        throw new CustomError.NotFoundError(`No report with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json(report);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getManyReport = async (req, res) => {
  const {id: patientId} = req.params;
  //console.log(patientId);
  try {
    const report = await Report.find({patientId: patientId});
    if (!report) {  
      throw new CustomError.NotFoundError(
        `No daily updates for patient with id : ${req.params.id}`
      );
    }
    res.status(StatusCodes.OK).json({ report });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};


module.exports = {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
  getReportByPatient,
  getManyReport
};
