const express = require("express");
const router = express.Router();

const {
    getAllLeaves,
    createLeaveRequest,
    getLeaveById,
    updateLeaveRequest,
    deleteLeaveRequest,
    getLeavesByStaffId
} = require("../controllers/staffLeaves.controller"); // Update the path as necessary

// Setup routes for leave requests
router.route("/")
    .post(createLeaveRequest) // POST '/leaves' - Create a new leave request
    .get(getAllLeaves);       // GET '/leaves' - Get all leave requests

router.route("/:id")
    .get(getLeaveById)       // GET '/leaves/:id' - Get a specific leave request by ID
    .put(updateLeaveRequest) // PUT '/leaves/:id' - Update a specific leave request by ID
    .delete(deleteLeaveRequest); // DELETE '/leaves/:id' - Delete a specific leave request
    


router.route("/std/:id")
    .get(getLeavesByStaffId); // GET '/leaves/staff/std/:staffId' - Get all leave requests for a specific staff member

    

module.exports = router
