const Booking_data = require("../models/booking.model.js");


//find all bookings
const getBookings = async(req, res) => {
    try {
        const booking_data = await Booking_data.find({});
        res.status(200).json({ booking_data });
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in fetching product");
    }
};


//find booking by id
const getBooking = async(req, res) => {
    try {
        const { id } = req.params;
        const booking_data = await Booking_data.findById({ _id: id });
        if (!booking_data) {
            return res.status(404).json({ msg: `No product with id : ${id}` });
        }
        res.status(200).json({ booking_data });
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in fetching product");
    }
};



//create booking
const createBooking = async(req, res) => {
    try {
        const booking_data = await Booking_data.create(req.body);
        res.status(200).json({ booking_data });
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in creating product");
    }
};



//update booking
const updateBooking = async(req, res) => {
    try {
        const { id } = req.params;
        const booking_data = await Booking_data.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!booking_data) {
            return res.status(404).json({ msg: `No product with id : ${id}` });
        }
        const updateBoking = await Booking_data.findById(id);
        res.status(200).json(updateBoking);
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in updating product");
    }
};


//delete booking
const deleteBooking = async(req, res) => {
    try {
        const { id } = req.params;
        const booking_data = await Booking_data.findByIdAndDelete(id);

        if (!booking_data) {
            return res.status(404).json({ msg: `No product with id : ${id}` });
        }
        res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in deleting product");
    }
};

module.exports = {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
};