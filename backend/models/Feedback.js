import mongoose from "mongoose";

// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
    feedbackId: {
        type: String,
        required: true,
        unique: true
    },
    patientId: {
        type: String,
        required: true
    },
    treatmentId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

// Create the feedback model
const FeedbackModel = mongoose.model("feedback", feedbackSchema);
model.export = FeedbackModel;