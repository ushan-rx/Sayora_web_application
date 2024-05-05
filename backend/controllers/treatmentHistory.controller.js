const TreatmentHistory = require("../models/treatmentHistory.model")

const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors')


const getAllTreatmentHistory = async (req, res) => {
    try {
      const tHistory = await TreatmentHistory.find().populate('treatment').exec();      
      res.status(StatusCodes.OK).json({tHistory});
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }

  //create new 
  const createTreatmentHistory = async (req, res) => {
    try {
      const tHistory = new TreatmentHistory(req.body);
      const newtHistory = await tHistory.save();
      res.status(StatusCodes.CREATED).json(newtHistory);
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }


  const getSingleTreatmentHistory = async (req, res) => {
    const { id: treatmentHistoryId } = req.params;
    try {
      const tHistory = await TreatmentHistory.findOne({ _id: treatmentHistoryId }).populate('treatment').exec();
      if (!tHistory) {
        throw new CustomError.NotFoundError(`No Treatment History with id : ${req.params.id}`);
      }
      res.status(StatusCodes.OK).json({tHistory});
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }


  const deleteTreatmentHistory = async (req, res) => {
    const { id: treatmentHistoryId } = req.params;
    try {
      var tHistory = await TreatmentHistory.findOne({ _id: treatmentHistoryId });

      if (!tHistory) {
        throw new CustomError.NotFoundError(`No doctor with id : ${req.params.id}`);
      }
      tHistory = await TreatmentHistory.findOneAndDelete({ _id: treatmentHistoryId });
      res.status(StatusCodes.OK).json({tHistory});
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }


  // get all treatments for one appointment
  const getFilteredTreatmentHistory = async(req, res) =>{
    const { id: appointmentId } = req.params;
    try {
        const tHistory = await TreatmentHistory.find({appointmentId: appointmentId}).populate('treatment').exec();  
        res.status(StatusCodes.OK).json({tHistory});
      } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
      }
  }

  const getManyTreatmentHistory = async (req, res) => {
    const {id: patientId} = req.params;
    //console.log(patientId);
    try {
      const tHistory = await TreatmentHistory.find({patientId: patientId}).populate('treatment').exec();
      if (!tHistory) {  
        throw new CustomError.NotFoundError(
          `No daily updates for patient with id : ${req.params.id}`
        );
      }
      res.status(StatusCodes.OK).json({ tHistory });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  };


  const getTreatmentHistoryByPatient = async(req, res) =>{
    const { id: patientId } = req.params;
    try {
        const tHistory = await TreatmentHistory.find({patientId: patientId}).populate('treatment').exec();  
        res.status(StatusCodes.OK).json({tHistory});
      } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
      }
  }

  const getTreatmentHistoryByDoctor = async(req, res) =>{
    const { id: docId } = req.params;
    try {
        const tHistory = await TreatmentHistory.find({doctorId: docId}).populate('treatment').exec();  
        res.status(StatusCodes.OK).json({tHistory});
      } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
      }
  }


  module.exports = {
    getAllTreatmentHistory,
    createTreatmentHistory,
    getSingleTreatmentHistory,
    deleteTreatmentHistory,
    getFilteredTreatmentHistory,
    getTreatmentHistoryByPatient,
    getManyTreatmentHistory,
    getTreatmentHistoryByDoctor
  }