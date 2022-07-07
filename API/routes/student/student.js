const express = require("express");
const router = express.Router();
const checkIsAdminVerified = require("../../helper/check-is-admin-verified");
const checkAuth = require("../../helper/check-auth");
const student_controller = require("../../controllers/student/student_controller");

router.get("/", checkAuth, student_controller.get_student_by_id);
router.get("/all", checkAuth, student_controller.get_all_students);

module.exports = router;
