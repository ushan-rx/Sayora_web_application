import mongoose from "mongoose";

// Define the schema for the regPatient collection
const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
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
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  allagies: [
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
    },
  ],
  surgicalProcedures: [{ name: { type: String }, date: { type: Date } }],
  vitals: [
    { checkdate: { type: Date } },
    { height: { type: Number }, unit: { type: String } }, //meke hama ekatama string type eke sub field eka gane dapn unit eka thiyaganna
    { weight: { type: Number }, unit: { type: String } },
    { temperature: { type: Number }, unit: { type: String } },
    { bloodPressure: { type: String } },
    { pulseRate: { type: Number }, unit: { type: String } },
    { respiratoryRate: { type: Number }, unit: { type: String } },
    { oxygenSaturation: { type: Number }, unit: { type: String } },
  ],
  treatmentHistory: [
    {
      treatment: {
        type: Schema.Types.ObjectId, // treatment referenced
        ref: "Treatment",
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],

  dailyQuestions: [
    {
      date: { type: Date },
      questionId: { type: String },
      mark: { type: Numbere },
    },
  ],
});

// Create the patient model
const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
