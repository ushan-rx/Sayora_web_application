import mongoose from "mongoose";

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
    type: boolean,
    default: false,
  },
  reports: [
    {
      type: Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
});

// Create the requesition model
const RequesitionModel = mongoose.model("requesition", requesition);
module.exports = RequesitionModel;
