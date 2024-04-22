const express = require("express");
const router = express.Router();

const { createFeedback } = require("../controllers/feedback.controller");

router.route("/").post(createFeedback); // '/feedback'

module.exports = router;
