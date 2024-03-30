import mongoose from "mongoose";

// Define the schema for the daily questions model
const dailyQuestionSchema = new mongoose.Schema({
    questionId: {
        type: String,
        required: true,
        unique: true
    },
    question: {
        type: String,
        required: true
    },
    options: [{
        number: {type: Number,required: true,unique: true},
        type: String,
        required: true
    }],
    answer: {
        optionNumber: {type: Number,required: true},
        type: String,
        required: true
    }
});

// Create the daily questions model
const DailyQuestionsModel = mongoose.model("dailyQuestions", dailyQuestionSchema);
model.export = DailyQuestionsModel;