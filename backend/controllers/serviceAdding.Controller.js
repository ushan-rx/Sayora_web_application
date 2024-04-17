const Service_data = require("../models/serviceAdding.model.js");
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index.js');

//find all bookings
const getAllServices = async(req, res) => {
    try {
        const service_data = await Service_data.find({});
        res.status(200).json({ service_data });
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in fetching product");
    }
};


//find booking by id
const getServiceById = async(req, res) => {
    try {
        const { id } = req.params;
        const service_data = await Service_data.findById({ _id: id });
        if (!service_data) {
            return res.status(404).json({ msg: `No product with id : ${id}` });
        }
        res.status(200).json({ service_data });
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in fetching product");
    }
};



//create booking
const createService = async(req, res) => {
    try {
        const service = new Service_data(req.body);
        const newService = await service.save();
        res.status(StatusCodes.CREATED).json(newService);
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in creating product");
    }
};



//update booking
const updateService = async(req, res) => {
    try {
        const { id } = req.params;
        const service_data = await Service_data.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!service_data) {
            return res.status(404).json({ msg: `No product with id : ${id}` });
        }
        // const updateService = await Service_data.findById(id);
        res.status(200).json(updateService);
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in updating product");
    }
};


//delete booking
const deleteService = async(req, res) => {
    try {
        const { id } = req.params;
        const service_data = await Service_data.findByIdAndDelete(id);

        if (!service_data) {
            return res.status(404).json({ msg: `No product with id : ${id}` });
        }
        res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in deleting product");
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};