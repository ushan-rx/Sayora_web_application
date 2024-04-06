const DoctorAvailableTime = require('../models/DoctorTime');

async function addDoctorAvailableTime(doctorID, date, time) {
    const newDoctorAvailableTime = new DoctorAvailableTime({
        doctorID,
        date,
        time
    });
    return await newDoctorAvailableTime.save();
}

async function getDoctorAvailableTimes() {
    return await DoctorAvailableTime.find();
}

async function getDoctorAvailableTimeByID(id) {
    return await DoctorAvailableTime.findById(id);
}

async function updateDoctorAvailableTime(id, doctorID, date, time) {
    return await DoctorAvailableTime.findByIdAndUpdate(id, { doctorID, date, time }, { new: true });
}

async function deleteDoctorAvailableTime(id) {
    return await DoctorAvailableTime.findByIdAndDelete(id);
}

module.exports = {
    addDoctorAvailableTime,
    getDoctorAvailableTimes,
    getDoctorAvailableTimeByID,
    updateDoctorAvailableTime,
    deleteDoctorAvailableTime
};