
const mongoose = require('mongoose');

const regularPatientSchema = new mongoose.Schema({
    patient: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Patient'
    },
    doctorId: {
        type: String,
        required: true
    },
    status:{            
        type: Boolean,
        default: true,
    },

});

const regularPatient = mongoose.model('RegularPatient', regularPatientSchema);

module.exports = regularPatient;
