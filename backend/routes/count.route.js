const express = require("express");
const router = express.Router();

const {
    StaffCount,
    ProductCount,
    PatientCount,
    DoctorCount,
    PendingLeaves,
    AppointmentCount,
} = require("../controllers/count.controller");


router.route("/staff").get(StaffCount),
router.route("/patient").get(PatientCount),
router.route("/doctor").get(DoctorCount),
router.route("/leaves").get(PendingLeaves),
router.route("/product").get(ProductCount),
router.route("/appoinment").get(AppointmentCount),




module.exports = router;