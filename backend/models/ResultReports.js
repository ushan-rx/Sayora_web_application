import mongoose from "mongoose";

// Define the schema for the result reports model
const resultReportsSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  testName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  documentURL: {
    type: String,
  },
});

// Create the result reports model
const Report = mongoose.model("resultReports", resultReportsSchema);
module.exports = Report;
