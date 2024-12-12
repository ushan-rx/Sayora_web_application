
const AppoinmentService = require('../Service/Appoinment.service');

async function addAppoinment(req, res) {
    try{
        const {App_date , App_time , App_reason , doctorID , patientName , patientAddress , patientContact , patientGender , patientemail, patientId} = req.body;
        const newAppoinment = await AppoinmentService.addAppoinment(App_date , App_time , App_reason , doctorID , patientName , patientAddress , patientContact , patientGender , patientemail, patientId);
        res.status(201).json(newAppoinment);

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

async function getAppoinments(req, res) {
    try{
        const appoinments = await AppoinmentService.getAppoinments();
        res.status(200).json(appoinments);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

async function getAppoinmentByID(req, res) {  
    try{
        const id = req.params['id'];
        const appoinment = await AppoinmentService.getAppoinmentByID(id);
        res.status(200).json(appoinment);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}   


async function updateAppoinment(req, res) {
    try{
        const id = req.params['id'];
        const status = req.body.status;
        await AppoinmentService.updateAppoinment(status, id);
        const updatedAppoinment = await AppoinmentService.getAppoinmentByID(id);
        res.status(200).json(updatedAppoinment);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

async function deleteAppoinment(req, res) {
    try{
        const id = req.params['id'];
        await AppoinmentService.deleteAppoinment(id);
        res.status(200).json({message: 'Appoinment deleted successfully'});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}


module.exports = {
    addAppoinment,
    getAppoinments,
    getAppoinmentByID,
    updateAppoinment,
    deleteAppoinment
}