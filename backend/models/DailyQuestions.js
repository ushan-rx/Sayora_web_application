const mongoose = require("mongoose");

// Define the schema for the daily questions model
const dailyQuestionSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
    unique: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      number: { type: Number, required: true, unique: true },
      type: String,
      required: true,
    },
  ],
  answer: {
    optionNumber: { type: Number, required: true },
    type: String,
    required: true,
  },
  group:{
    type: String,
    required: true,
  }
});

//for id generation
const customIdPrefix = "QST";
const length = 3;

// Pre-save hook to generate id
dailyQuestionSchema.pre("validate", async function (next) {
  const MyModel = this.constructor;
  // Find the last document with a custom ID starting with the provided prefix
  let lastDoc = await MyModel.find().sort({ _id: -1 }).limit(1);
  // Generate the new custom ID
  let newId = customIdPrefix;
  if (lastDoc[0] !== undefined) {
    const currentNumber = parseInt(
      lastDoc[0].questionId.slice(customIdPrefix.length)
    );
    newId += String(currentNumber + 1).padStart(length, "0");
  } else {
    newId += "001";
  }
  this.questionId = newId;
  console.log(newId);
  next();
});

// Create the daily questions model
const DailyQuestionsModel = mongoose.model(
  "dailyQuestions",
  dailyQuestionSchema
);
module.exports = DailyQuestionsModel;
