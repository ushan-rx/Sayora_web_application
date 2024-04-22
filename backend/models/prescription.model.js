
const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true
  },
  doctorId: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
  },
  sickness:{
    type: String,
  },
  medications: [{
    medication: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
    },
  }],
  instructions: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
