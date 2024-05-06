const mongoose = require('mongoose');

const doctorNoteSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true
      },
      doctorId: {
        type: String,
        required: true
      },
      subject: {
        type: String,
      },
      note: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now
      }
});

const doctorNote = mongoose.model('DoctorNote', doctorNoteSchema);

module.exports = doctorNote;
