const express = require("express");
const router = express.Router();
const Service_data = require("../models/serviceAdding.model.js");
const {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} = require("../controllers/serviceAdding.Controller.js");

router.get("/", getAllServices); // to get all services
router.get("/:id", getServiceById); // to get a specific service by id
router.post("/", createService); // to create a new service
router.put("/:id", updateService); // to update a specific service by id
router.delete("/:id", deleteService); // to delete a specific service by id

module.exports = router;