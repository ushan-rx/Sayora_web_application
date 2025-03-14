const express = require("express");
const router = express.Router();

const {
    getAllStaff,
    createStaff,
    getSingleStaff,
    updateStaff,
    deleteStaff,
    getActiveStaffCount,
} = require("../controllers/staff.controller");

router.route("/").post(createStaff).get(getAllStaff); // '/staff'
router.route("/count").get(getActiveStaffCount),

router
  .route("/:id")
  .get(getSingleStaff) // '/staff/STF00001'
  .put(updateStaff) // '/staff/STF00001'
  .delete(deleteStaff);


module.exports = router;