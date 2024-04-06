const mongoose = require("mongoose");

// Define the schema for the daily updates model
const dailyUpdatesSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  temperature: {
    type: Number,
  },
  symptoms: [
    {
      type: String,
      required: true,
    },
  ],
  medications: [
    {
      type: { type: String },
      messure: { type: String },
    },
  ],
  additionalNotes: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    required: true,
  },
  documentURL: {
    type: String,
  }
});

// Create the daily updates model
const DailyUpdatesModel = mongoose.model("DailyUpdates", dailyUpdatesSchema);
module.exports = DailyUpdatesModel;
