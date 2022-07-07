const express = require("express");
const router = express.Router();
const checkIsAdminVerified = require("../../helper/check-is-admin-verified");
const checkAuth = require("../../helper/check-auth");

const committee_controller = require("../../controllers/faculty/comittee");

router.post("/create", committee_controller.create_committee);
router.get("/all", checkAuth, committee_controller.get_all_committee);
router.get("/:id", committee_controller.get_committee_by_id);
router.put("/:id", committee_controller.update_committee_by_id);
router.delete("/:id", committee_controller.delete_committee_by_id);

module.exports = router;
