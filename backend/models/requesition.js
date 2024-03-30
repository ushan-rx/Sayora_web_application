import mongoose from "mongoose";

// Define the schema for the requesition model
const requesition = new mongoose.Schema({
    requestId: {
        type: String,
        required: true,
        unique: true
    },
    patientId: {
        type: String,
        required: true
    },
    doctorId: {
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
    documentURL: [
        {
            type: String,
            required: true
        }
    ],
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        required: true
    }
});

// Create the requesition model
const RequesitionModel = mongoose.model("requesition", requesition);
module.exports = RequesitionModel;