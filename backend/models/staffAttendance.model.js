//staff attendance

const mongoose = require('mongoose');

const staffAttendanceSchema = new mongoose.Schema({
    attendanceID: {
        type: String,
        required: true
    },
    staffId: {
        type: String,
        required: true
    },
    staffName: {
        type: String,
        required:true
    },
  
      JobRole: {
        type: String,
        required:true
    },

    AttendanceDate: {
        type: Date,
        default: Date.now
    },
    InTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    OutTime: {
        type: Date
    }
});

// Pre-save hook to generate attendaNCEID
//for id generation
const customIdPrefix = "ATT";
const length = 5;

// Pre-save hook to generate id
staffAttendanceSchema.pre("validate", async function (next) {
  const MyModel = this.constructor;
  
  let lastDoc = await MyModel.find().sort({ _id: -1 }).limit(1);
  // Generate the new custom ID
  let newId = customIdPrefix;
  if (lastDoc[0] !== undefined) {
    const currentNumber = parseInt(
      lastDoc[0].attendanceID.slice(customIdPrefix.length)
    );
    newId += String(currentNumber + 1).padStart(length, "0");
  } else {
    newId += "00001";
  }
  this.attendanceID = newId;
  console.log(newId);
  next();
});

const StaffAttendance = mongoose.model('StaffAttendance', staffAttendanceSchema);

module.exports = StaffAttendance;
