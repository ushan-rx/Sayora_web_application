const mongoose = require("mongoose");

// Define the schema for the requesition model
const requesition = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  testName: {
    type: String,
  },
  reqDate: {
    type: Date,
    required: true,
  },
  is_uploaded: {
    type: Boolean,
    default: false,
  },
});

// Create the requesition model
const RequesitionModel = mongoose.model("requesition", requesition);
module.exports = RequesitionModel;
