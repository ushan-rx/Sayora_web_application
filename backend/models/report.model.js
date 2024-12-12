const mongoose = require("mongoose");

// Define the schema for the result reports model
const reportsSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  testName: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  documentURL: {
    type: String,
  },
});

// Create the result reports model
const Report = mongoose.model("Report", reportsSchema);
module.exports = Report;
