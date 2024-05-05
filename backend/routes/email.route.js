const express = require("express");
const router = express.Router();

const {
    getEmails,
    getEmail,
    createEmail,
    updateEmail,
    deleteEmail
} = require("../controllers/email.controller.js");

router.get("/", getEmails);
router.get("/:id", getEmail);
router.post("/", createEmail);
router.put("/:id", updateEmail);
router.delete("/:id", deleteEmail);

module.exports = router;