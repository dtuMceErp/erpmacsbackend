const express = require("express");
const router = express.Router();
const checkIsAdminVerified = require("../../helper/check-is-admin-verified");
const checkAuth = require("../../helper/check-auth");

const meeting_controller = require("../../controllers/faculty/meeting");

router.post("/create", meeting_controller.create_meeting);
router.get("/all", checkAuth, meeting_controller.get_all_meeting);
router.get("/:id", meeting_controller.get_meeting_by_id);
router.put("/:id", meeting_controller.update_meeting_by_id);
router.delete("/:id", meeting_controller.delete_meeting_by_id);

module.exports = router;
