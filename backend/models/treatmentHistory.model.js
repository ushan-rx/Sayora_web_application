
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
        patient: {
            type: String,
            required: true,
        },
        doctor: {
            type: String,
            required: true,
        },
      
});

const treatmentHistory = mongoose.model('TreatmentHistory', treatmentHistorySchema);

module.exports = treatmentHistory;
