const express = require("express");
const router = express.Router();
const checkAuth = require("../../helper/check-auth");
const checkIsAdminVerified = require("../../helper/check-is-admin-verified");
const research_controller = require("../../controllers/student/research_controller");
const research_validator = require("../../validators/student/research_validator");

router.get(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  research_controller.get_research_by_id
);
router.post(
  "/create",
  checkAuth,
  checkIsAdminVerified,
  research_validator.research_validator,
  research_controller.create_new_research
);
router.patch(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  research_validator.research_validator,
  research_controller.update_research_by_id
);
router.delete(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  research_controller.delete_research_by_id
);

module.exports = router;
