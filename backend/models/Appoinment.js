const mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema({
  App_Id: {
    type: String,
    required: true,
    unique: true
  },
  App_date: {
    type: Date,
    required: true
  },
  App_time: {
    type: String,
    required: true
  },
  App_reason: {
    type: String,
    required: true
  },
  doctorID: {
    type: String,
    required: true
},
patientId:{          
  type:String
},
patientName: {
    type: String,
    required: true
},
patientAddress: {
    type: String,
    required: true
},
patientContact: {
    type: String,
    required: true
},
patientGender: {
    type: String,
    required: true
},
patientemail: {
  type: String,
  required: true
},
status: {
  type: String,
  enum: ['Pending', 'Approved', 'Cancle', 'Completed'],
  default: 'Pending'
}
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

