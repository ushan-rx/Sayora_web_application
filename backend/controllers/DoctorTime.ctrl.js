const DoctorAvailableTimeService = require('../Service/DoctorTime.service');

async function addDoctorAvailableTime(req, res) {
    try {
        const { doctorID, date, time } = req.body;
        const newDoctorAvailableTime = await DoctorAvailableTimeService.addDoctorAvailableTime(doctorID, date, time);
        res.status(201).json(newDoctorAvailableTime);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getDoctorAvailableTimes(req, res) {
    try {
        const doctorAvailableTimes = await DoctorAvailableTimeService.getDoctorAvailableTimes();
        res.status(200).json(doctorAvailableTimes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getDoctorAvailableTimeByID(req, res) {
    try {
        const id = req.params['id'];
        const doctorAvailableTime = await DoctorAvailableTimeService.getDoctorAvailableTimeByID(id);
        res.status(200).json(doctorAvailableTime);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateDoctorAvailableTime(req, res) {
    try {
        const id = req.params['id'];
        const { doctorID, date, time } = req.body;
        const updatedDoctorAvailableTime = await DoctorAvailableTimeService.updateDoctorAvailableTime(id, doctorID, date, time);
        res.status(200).json(updatedDoctorAvailableTime);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteDoctorAvailableTime(req, res) {
    try {
        const id = req.params['id'];
        await DoctorAvailableTimeService.deleteDoctorAvailableTime(id);
        res.status(200).json({ message: 'Doctor available time deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    addDoctorAvailableTime,
    getDoctorAvailableTimes,
    getDoctorAvailableTimeByID,
    updateDoctorAvailableTime,
    deleteDoctorAvailableTime
};
