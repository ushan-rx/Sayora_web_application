const AppointmentModel = require('../models/Appoinment')
const mail = require('./SendEmail')

async function findID(accNo){
    const existinAccount = await AppointmentModel.findOne({App_Id:accNo});
    if(!existinAccount)
      return true
    else
      return false
  }


function generateID() {

    let chars = '1234'; // Characters to use for ID
    let accID = 'app';
    for (let i = 0; i < 4; i++) { 
      accID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    console.log(accID);
    // Check if ID has already been generated
    const existingAccNO = findID(accID);
  
    if (!existingAccNO) {
      return generateID();
    } else {
      let fAcc = accID.toString();
      return fAcc
    }
  }


async function addAppoinment(App_date , App_time , App_reason , doctorID , patientName , patientAddress , patientContact , patientGender , patientemail){
    const App_Id = generateID();
    const newAppoinment = new AppointmentModel({
        App_Id,
        App_date,
        App_time,
        App_reason,
        doctorID,
        patientName,
        patientAddress,
        patientContact,
        patientGender,
        patientemail,
    });
    await newAppoinment.save();
    return newAppoinment;
}

async function getAppoinments(){
    return await AppointmentModel.find();
}

async function getAppoinmentByID(id){
    return await AppointmentModel.findOne({App_Id:id});
}

async function updateAppoinment(status, id){

        const data = await AppointmentModel.findOne({App_Id: id});
        const emailAdd = data.patientemail;
        try{
          mail.sendmail(emailAdd , "Appoinment Status Updated" , `Your Appoinment Status has been updated to ${status}. Thank you for connecting with us.` );
        }catch(err){
          console.log(err);
        }
        
        await AppointmentModel.findOneAndUpdate({App_Id: id}, {status});
        return AppointmentModel.findOne({App_Id: id});
}

async function deleteAppoinment(id){
    return await AppointmentModel.findOneAndDelete({App_Id: id});
}

   
module.exports = {
    addAppoinment,
    getAppoinments,
    getAppoinmentByID,
    updateAppoinment,
    deleteAppoinment
}
