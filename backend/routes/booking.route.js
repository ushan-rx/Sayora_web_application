const express = require("express");
const router = express.Router();
const Booking_data = require("../models/booking.model.js");
const {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
} = require("../controllers/booking.controller.js");

router.get("/", getBookings);
router.get("/:id", getBooking);
router.post("/", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;