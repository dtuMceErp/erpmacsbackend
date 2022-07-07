const express = require("express");
const router = express.Router();
const checkAuth = require("../../helper/check-auth");
const checkIsAdminVerified = require("../../helper/check-is-admin-verified");
const certification_controller = require("../../controllers/student/certification_controller");
const certification_validator = require("../../validators/student/certification_validation");

router.get(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  certification_controller.get_certification_by_id
);
router.post(
  "/create",
  checkAuth,
  checkIsAdminVerified,
  certification_validator.certification_validator,
  certification_controller.create_new_certificaton
);
router.patch(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  certification_validator.certification_validator,
  certification_controller.update_certification_by_id
);
router.delete(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  certification_controller.delete_certification_by_id
);

module.exports = router;
