const express = require("express");
const router = express.Router();

const {
    assignSalary,
    getAllSalaries,
    getSalaryById,
    updateSalary,
    getSalaryByStaffId,
    deleteSalary
} = require("../controllers/staffSalary.controller.js"); // Update the path as necessary


// Setup routes for salary records
router.route("/")
    .post(assignSalary) // POST '/salaries' - Create a new salary record
    .get(getAllSalaries); // GET '/salaries' - Get all salary records

router.route("/:id")
    .get(getSalaryById)       // GET '/salaries/:id' - Get a specific salary record by ID
    .put(updateSalary)        // PUT '/salaries/:id' - Update a specific salary record by ID
    .delete(deleteSalary);    // DELETE '/salaries/:id' - Delete a specific salary record

    router.route("/staff/:id")
    .get(getSalaryByStaffId); // GET '/staff/:id' - Get all salary records for a specific staff member



module.exports = router;
