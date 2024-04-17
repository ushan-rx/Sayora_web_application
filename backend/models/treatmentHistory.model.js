
const mongoose = require('mongoose');

const treatmentHistorySchema = new mongoose.Schema({
        treatment: {
          type: Schema.Types.ObjectId, // treatment referenced
          ref: "Treatment",
        },
        date: {
          type: Date,
          required: true,
        },
        patientId: {
            type: String,
            required: true,
        },
        doctor: {
            type: String,
            required: true,
        },
        isComplete:{
            type: Boolean,
            default: false,
        },
      
});

const treatmentHistory = mongoose.model('TreatmentHistory', treatmentHistorySchema);

module.exports = treatmentHistory;
