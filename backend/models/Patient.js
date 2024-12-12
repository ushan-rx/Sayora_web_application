const mongoose = require("mongoose");

// Define the schema for the regPatient collection
const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  profilePic: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  allergies: [
    {
      type: String,
    },
  ],

  familyHistory: [{ name: { type: String }, relationship: { type: String } }],

  currentMedications: [
    {
      name: { type: String },
      dosage: { type: String },
      frequency: { type: String },
      reason: { type: String },
    },
  ],
  surgicalProcedures: [{ name: { type: String }, date: { type: Date } }],

  vitals: [
    {
      checkdate: { type: Date, default: Date.now },
      height: { type: Number },
      weight: { type: Number },
      temperature: { type: Number },
      bloodPressure: { type: String },
      pulseRate: { type: Number },
      respiratoryRate: { type: Number },
      unit: { type: String },
      oxygenSaturation: { type: Number },
    },
  ],

  treatmentHistory: [
    {
      treatmentRecord: {
        type: mongoose.Schema.Types.ObjectId, // treatmentHistory referenced
        ref: "TreatmentHistory",
      },
    },
  ],

  prescriptions: {
    doctorId: {type: String,},
    medications: [{medication: {type: String,},dosage: {type: String,}}],
    instructions: {type: String,},
    disease: {type: String,},
    date: {type: Date,default: Date.now}
  },

  dailyQuestions: [
    {
      date: { type: Date },
      questionId: { type: String },
      mark: { type: Number },
    },
  ],
  
  status: {
    //for delete purpose
    type: Boolean,
    default: true,
  },
});

//for id generation
const customIdPrefix = "PAT";
const length = 5;

// Pre-save hook to generate id
patientSchema.pre("validate", async function (next) {
  const MyModel = this.constructor;
  // Find the last document with a custom ID starting with the provided prefix
  let lastDoc = await MyModel.find().sort({ _id: -1 }).limit(1);
  // Generate the new custom ID
  let newId = customIdPrefix;
  if (lastDoc[0] !== undefined) {
    const currentNumber = parseInt(
      lastDoc[0].patientId.slice(customIdPrefix.length)
    );
    newId += String(currentNumber + 1).padStart(length, "0");
  } else {
    newId += "00001";
  }
  this.patientId = newId;
  console.log(newId);
  next();
});

// Create the patient model
const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;