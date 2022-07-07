const express = require("express");
const router = express.Router();
const checkAuth = require("../../helper/check-auth");
const checkIsAdminVerified = require("../../helper/check-is-admin-verified");
const achievement_controller = require("../../controllers/student/achievement_controller");

router.get(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  achievement_controller.get_achievement_by_id
);
router.post(
  "/create",
  checkAuth,
  checkIsAdminVerified,
  achievement_controller.create_new_achievement
);
router.patch(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  achievement_controller.update_achievement_by_id
);
router.delete(
  "/:id",
  checkAuth,
  checkIsAdminVerified,
  achievement_controller.delete_achievement_by_id
);

module.exports = router;
