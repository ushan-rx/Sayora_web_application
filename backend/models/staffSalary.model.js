const mongoose = require('mongoose');

const staffSalarySchema = new mongoose.Schema({
    salaryId: {
        type: String,
        required: true
    },
    staffId: {
        type: String,
        required: true
    },
    staffName: {
        type: String,
        required: true
    },
    bankAcc: {
        type: String,
        required: true
    },
    salaryMonth: {
        type: String,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    baseSalary: {
        type: Number,
        default: 20000
    },
    deductions: {
        type: Number,
        default: 0
    },
    Bonus: {
        type: Number,
        default: 0
    },
    netSalary: {
        type: Number,
        required: true,
        default: 0
    }
});

// Pre-save hook to generate salaryId
//for id generation
const customIdPrefix = "SAL";
const length = 5;

// Pre-save hook to generate id
staffSalarySchema.pre("validate", async function (next) {
  const MyModel = this.constructor;
  
  let lastDoc = await MyModel.find().sort({ _id: -1 }).limit(1);
  // Generate the new custom ID
  let newId = customIdPrefix;
  if (lastDoc[0] !== undefined) {
    const currentNumber = parseInt(
      lastDoc[0].salaryId.slice(customIdPrefix.length)
    );
    newId += String(currentNumber + 1).padStart(length, "0");
  } else {
    newId += "00001";
  }
  this.salaryId = newId;
  console.log(newId);
  next();
});

const StaffSalary = mongoose.model('StaffSalary', staffSalarySchema);

module.exports = StaffSalary;