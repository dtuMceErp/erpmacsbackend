const express = require("express");
const router = express.Router();
const email_controller = require("../controllers/email_controller");

router.post("/:id", email_controller.email_confirmation);

module.exports = router;
