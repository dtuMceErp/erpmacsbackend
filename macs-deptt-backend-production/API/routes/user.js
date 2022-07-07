const express = require("express");
const router = express.Router();
const checkAuth = require("../helper/check-auth");
const checkIsAdminVerified = require("../helper/check-is-admin-verified");
const UserController = require("../controllers/user_controller");

const signup_validator = require("../validators/signup_validator");

router.post(
  "/signup",
  signup_validator.student_signup_validator,
  UserController.user_signup
);

router.post("/login", UserController.user_login);

router.post("/verify/", checkAuth, UserController.verify_by_admin);
router.post("/deactivate/", checkAuth, UserController.deactivate_user);

router.get(
  "/student/verify/all",
  checkAuth,
  UserController.get_all_students_for_admin_verification
);

router.get(
  "/faculty/verify/all",
  checkAuth,
  UserController.get_all_faculty_for_admin_verification
);

router.delete(
  "/student/verify/delete",
  checkAuth,
  UserController.delete_verify_student
);

router.delete(
  "/faculty/verify/delete",
  checkAuth,
  UserController.delete_verify_faculty
);

module.exports = router;
