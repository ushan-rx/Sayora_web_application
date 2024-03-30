import mongoose from "mongoose";

// Define the schema for the result reports model
const resultReportsSchema = new mongoose.Schema({
    reportId: {
        type: String,
        required: true,
        unique: true
    },
    patientId: {
        type: String,
        required: true
    },
    testId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    documentURL: {
        type: String,
        required: true
    }
});

// Create the result reports model
const ResultReportsModel = mongoose.model("resultReports", resultReportsSchema);
module.exports = ResultReportsModel;