import mongoose from "mongoose";

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
  },
  reports: [
    {
      // me reference karala thiyenne report eka mevidiyatama dapn meka
      type: Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
});

// Create the daily updates model
const DailyUpdatesModel = mongoose.model("dailyUpdates", dailyUpdatesSchema);
module.exports = DailyUpdatesModel;
