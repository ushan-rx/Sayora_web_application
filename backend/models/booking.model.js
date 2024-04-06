const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
    bookingId: {
        type: String,

    },

    firstName: {
        type: String,
        required: [true, "Please provide first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide last name"]
    },
    nic: {
        type: String,
        required: [true, "Please provide NIC"]
    },
    email: {
        type: String,
        required: [true, "Please provide email"]
    },
    phoneNumber01: {
        type: String,
        required: [true, "Please provide phone number01"]
    },
    phoneNumber02: {
        type: String,
        required: [true, "Please provide phone number02"]
    },
    bookingDate: {
        type: Date,
        required: [true, "Please provide booking date"]
    },
    time: {
        type: String,
        required: [true, "Please provide time"]
    },
    organizationName: {
        type: String,
        required: [true, "Please provide organization name"]
    },
    venue: {
        type: String,
        required: [true, "Please provide venue"]
    },
    participantCount: {
        type: Number,
        required: [true, "Please provide participant count"],
        default: 0
    }
}, {
    timestamps: true
});





//for id generation
const customIdPrefix = 'Boo';
const length = 3;


// Pre-save hook to generate id
BookingSchema.pre('validate', async function(next) {
    const MyModel = this.constructor;
    // Find the last document with a custom ID starting with the provided prefix
    let lastDoc = await MyModel.find({ bookingId: { $exists: true } }).sort({ _id: -1 }).limit(1);

    // Generate the new custom ID
    let newId = customIdPrefix;
    if (lastDoc && lastDoc.length > 0 && lastDoc[0] && lastDoc[0].bookingId) {
        console.log(lastDoc[0].bookingId);
        const currentNumber = parseInt(lastDoc[0].bookingId.slice(customIdPrefix.length));
        newId += String(currentNumber + 1).padStart(length, '0');
    } else {
        newId += "001";
    }

    this.bookingId = newId;
    console.log(newId);
    next();
});


const Booking = mongoose.model("Booking_data", BookingSchema);


module.exports = Booking;