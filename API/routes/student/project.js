const express = require("express");
const router = express.Router();
const checkAuth = require("../../helper/check-auth");
const checkIsAdminVerified = require("../../helper/check-is-admin-verified");
const project_controller = require("../../controllers/student/project_controller");
const project_validator = require("../../validators/student/project_validator");

router.get(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  project_controller.get_project_by_id
);
router.post(
  "/create",
  checkAuth,
  checkIsAdminVerified,
  project_validator.project_validator,
  project_controller.create_new_project
);
router.patch(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  project_validator.project_validator,
  project_controller.update_project_by_id
);
router.delete(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  project_controller.delete_project_by_id
);

module.exports = router;
