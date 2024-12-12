const express = require("express");
const router = express.Router();

const {
  createPatient,
  updatePatient,
  deletePatient,
  getAllPatients,
  getSinglePatient,
} = require("../controllers/patient.controller");

router.route("/").post(createPatient).get(getAllPatients); // '/patient'

router
  .route("/:id")
  .get(getSinglePatient) // '/patient/PAT00001'
  .put(updatePatient) // '/patient/PAT00001'
  .delete(deletePatient);

module.exports = router;
