const mongoose = require('mongoose')

const staffSchema =  new mongoose.Schema({
    staffId: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },


    Status: {
        type: String,
        default: "Active"
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },

    Image: {
        type: String,
        default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
    },

    JoinedDate: {
        type: Date,
        default: Date.now
    },
    Gender: {
        type: String,
        required: true
    },

    JobRole: {
        type: String,
        required: true
    },
    BaseSalary: {
        type: Number,
        default: 30000
    },


})

//for id generation
const customIdPrefix = "STF";
const length = 5;

// Pre-save hook to generate id
staffSchema.pre("validate", async function (next) {
  const MyModel = this.constructor;
  // Find the last document with a custom ID starting with the provided prefix
  let lastDoc = await MyModel.find().sort({ _id: -1 }).limit(1);
  // Generate the new custom ID
  let newId = customIdPrefix;
  if (lastDoc[0] !== undefined) {
    const currentNumber = parseInt(
      lastDoc[0].staffId.slice(customIdPrefix.length)
    );
    newId += String(currentNumber + 1).padStart(length, "0");
  } else {
    newId += "00001";
  }
  this.staffId = newId;
  console.log(newId);
  next();
});

const staffModel = mongoose.model("staffs", staffSchema)
module.exports = staffModel
