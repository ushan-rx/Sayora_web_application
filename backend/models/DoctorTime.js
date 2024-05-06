const mongoose = require('mongoose');

const doctorAvailableTimeSchema = new mongoose.Schema({
    doctorID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const DoctorAvailableTime = mongoose.model('DoctorAvailableTime', doctorAvailableTimeSchema);

module.exports = DoctorAvailableTime;

