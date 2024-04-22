const mongoose = require('mongoose');

const staffLeavesSchema = new mongoose.Schema({
    leavesId: {
        type: String,
        required: true,
    },
    staffId: {
        type: String,
        required: true,

    },
    reason: {
        type: String,
        required: true
    },
    leaveStartTime: {
        type: Date,
        required: true
    },
    leaveEndTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },

    staffName: {
      type: String,
      required:true
  },

    JobRole: {
      type: String,
      required:true
  }

}, { timestamps: true });

// Pre-save hook to generate leavesId
//for id generation
const customIdPrefix = "LEA";
const length = 5;

// Pre-save hook to generate id
staffLeavesSchema.pre("validate", async function (next) {
  const MyModel = this.constructor;
  
  let lastDoc = await MyModel.find().sort({ _id: -1 }).limit(1);
  // Generate the new custom ID
  let newId = customIdPrefix;
  if (lastDoc[0] !== undefined) {
    const currentNumber = parseInt(
      lastDoc[0].leavesId.slice(customIdPrefix.length)
    );
    newId += String(currentNumber + 1).padStart(length, "0");
  } else {
    newId += "00001";
  }
  this.leavesId = newId;
  console.log(newId);
  next();
});

const StaffLeaves = mongoose.model('StaffLeaves', staffLeavesSchema);
module.exports = StaffLeaves;
