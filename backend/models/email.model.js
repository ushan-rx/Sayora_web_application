const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
    reciver: {
        type: String,
        required: [true, "Please provide receiver"]
    },
    subject: {
        type: String,
        required: [true, "Please provide subject"]
    },
    booking_id: {
        type: String,
        required: [true, "Please provide booking ID"]
    },
    text: {
        type: String,
        required: [true, "Please provide text"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    sentDate: {
        type: Date,
        required: [true, "Please provide sent date"]
    },
    receivedDate: {
        type: Date,
        required: [true, "Please provide received date"]
    },
}, {
    timestamps: true
});

//for id generation
const customIdPrefix = 'Ema';
const length = 3;

// Pre-save hook to generate id
EmailSchema.pre('validate', async function(next) {
    const MyModel = this.constructor;
    // Find the last document with a custom ID starting with the provided prefix
    let lastDoc = await MyModel.find({ booking_id: { $exists: true } }).sort({ _id: -1 }).limit(1);

    // Generate the new custom ID
    let newId = customIdPrefix;
    if (lastDoc && lastDoc.length > 0 && lastDoc[0] && lastDoc[0].booking_id) {
        console.log(lastDoc[0].booking_id);
        const currentNumber = parseInt(lastDoc[0].booking_id.slice(customIdPrefix.length));
        newId += String(currentNumber + 1).padStart(length, '0');
    } else {
        newId += "001";
    }

    this.booking_id = newId;
    console.log(newId);
    next();
});

const Email = mongoose.model("Email_data", EmailSchema);

module.exports = Email;