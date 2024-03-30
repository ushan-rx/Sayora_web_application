const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
        booking_id: {
            type: String,
            required: [true, "Please provide booking_id"]
        },
        NIC: {
            type: String,
            required: [true, "Please provide NIC"]
        },
        first_name: {
            type: String,
            required: [true, "Please provide first name"]
        },
        last_name: {
            type: String,
            required: [true, "Please provide last name"]
        },
        organization_name: {
            type: String,
            required: [true, "Please provide organization name"]
        },
        booking_date: {
            type: Date,
            required: [true, "Please provide booking date"]
        },
        phone_numbers: {
            type: String,
            required: [true, "Please provide phone numbers"]
        },
        time: {
            type: String,
            required: [true, "Please provide time"]
        },
        email: {
            type: String,
            required: [true, "Please provide email"]
        },
        participant_count: {
            type: Number,
            required: [true, "Please provide participant count"],
            default: 0
        },
        venue: {
            type: String,
            required: [true, "Please provide venue"]
        },
        status: {
            type: String,
            required: [true, "Please provide status"]
        }
    },

    {
        timestamps: true
    }
);

const Booking = mongoose.model("Booking_data", BookingSchema);
module.exports = Booking;