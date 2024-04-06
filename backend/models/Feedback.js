const mongoose = require("mongoose");

// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
  feedbackId: {
    type: String,
    required: true,
    unique: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  treatmentId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  comment: {
    type: String,
  },
});

//for id generation
const customIdPrefix = "FDB";
const length = 5;

// Pre-save hook to generate id
feedbackSchema.pre("validate", async function (next) {
  const MyModel = this.constructor;
  // Find the last document with a custom ID starting with the provided prefix
  let lastDoc = await MyModel.find().sort({ _id: -1 }).limit(1);

  // Generate the new custom ID
  let newId = customIdPrefix;
  if (lastDoc[0] !== undefined) {
    const currentNumber = parseInt(
      lastDoc[0].feedbackId.slice(customIdPrefix.length)
    );
    newId += String(currentNumber + 1).padStart(length, "0");
  } else {
    newId += "00001";
  }
  this.feedbackId = newId;
  console.log(newId);
  next();
});

// Create the feedback model
const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
