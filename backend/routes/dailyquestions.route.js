const express = require("express");
const router = express.Router();

const {
    getAllQuestion,
  createQuestion,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/dailyquestions.controller");

router.route("/").post(createQuestion).get(getAllQuestion); // '/dailyquestions'

router
    .route("/:id")
    .get(getSingleQuestion) // '/dailyquestions/DOC00001'
    .put(updateQuestion) // '/dailyquestions/DOC00001'
    .delete(deleteQuestion);

module.exports = router;