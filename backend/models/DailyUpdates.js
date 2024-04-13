const mongoose = require("mongoose");

// Define the schema for the daily updates model
const dailyUpdatesSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  reportName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  temperature: {
    type: Number,
  },
  symptoms: [
    {
      type: String
    },
  ],
  medications: [
    {
      type: { type: String },
      messure: { type: String }
    },
  ],
  additionalNotes: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"]
  },
  documentURL: {
    type: String,
  }
});

// Create the daily updates model
const DailyUpdatesModel = mongoose.model("DailyUpdates", dailyUpdatesSchema);
module.exports = DailyUpdatesModel;
