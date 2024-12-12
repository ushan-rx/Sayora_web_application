const express = require("express");
const router = express.Router();

const {
    getAllAttendances,
    markAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
    getAttendancesByStaffId
} = require("../controllers/staffAttendance.controller"); 

// Setup routes for attendance records
router.route("/")
.post(markAttendance) // POST '/attendances' - Create a new attendance record
    .get(getAllAttendances); // GET '/attendances' - Get all attendance records

router.route("/:id")
    .get(getAttendanceById)       // GET '/attendances/:id' - Get a specific attendance record by ID
    .put(updateAttendance)        // PUT '/attendances/:id' - Update a specific attendance record by ID
    .delete(deleteAttendance);    // DELETE '/attendances/:id' - Delete a specific attendance record

router.route("/staff/:id")
    .get(getAttendancesByStaffId); // GET '/attendances/staff/:staffId' - Get all attendance records for a specific staff member

module.exports = router;
