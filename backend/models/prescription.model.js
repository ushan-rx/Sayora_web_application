
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
  medications: [{
    medication: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    }
  }],
  instructions: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
