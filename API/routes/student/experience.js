const express = require("express");
const router = express.Router();
const checkAuth = require("../../helper/check-auth");
const checkIsAdminVerified = require("../../helper/check-is-admin-verified");
const experience_controller = require("../../controllers/student/experience_controller");
const experience_validator = require("../../validators/student/experience_validator");

router.get(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  experience_controller.get_experience_by_id
);
router.post(
  "/create",
  checkAuth,
  checkIsAdminVerified,
  experience_validator.experience_validator,
  experience_controller.create_new_experience
);
router.patch(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  experience_validator.experience_validator,
  experience_controller.update_experience_by_id
);
router.delete(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  experience_controller.delete_experience_by_id
);

module.exports = router;
