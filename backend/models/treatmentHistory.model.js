
const mongoose = require('mongoose');

const treatmentHistorySchema = new mongoose.Schema({
        treatment: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Treatment'
        },
        date: {
          type: Date,
          default: Date.now,
          required: true,
        },
        patientId: {
            type: String,
            required: true,
        },
        doctorId: {
            type: String,
            required: true,
        },
        appointmentId: {           
          type: String,
        },
        isComplete:{            
            type: Boolean,
            default: false,
        },
      
});

const treatmentHistory = mongoose.model('TreatmentHistory', treatmentHistorySchema);

module.exports = treatmentHistory;
