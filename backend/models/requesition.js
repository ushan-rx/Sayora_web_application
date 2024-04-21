const mongoose = require("mongoose");

// Define the schema for the requesition model
const requesition = new mongoose.Schema({
  patientId: {
    type: String,
  },
  doctorId: {
    type: String,
  },
  testName: {
    type: String,
  },
  reqDate: {
    type: Date,
  },
  is_uploaded: {
    type: Boolean,
    default: false,
  },
});

// Create the requesition model
const RequesitionModel = mongoose.model("requesition", requesition);
module.exports = RequesitionModel;
