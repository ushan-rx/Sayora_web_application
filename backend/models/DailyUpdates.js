import mongoose from "mongoose";

// Define the schema for the daily updates model
const dailyUpdatesSchema = new mongoose.Schema({
    updateId: {
        type: String,
        required: true,
        unique: true
    },
    patientId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    symptoms: [{
        type: String,
        required: true
    }],
    medications: {
        type: String,
        required: true
    },
    additionalNotes: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        required: true
    },
    documentURL: {
        type: String,
        required: true
    }
});

// Create the daily updates model
const DailyUpdatesModel = mongoose.model("dailyUpdates", dailyUpdatesSchema);
module.exports = DailyUpdatesModel;