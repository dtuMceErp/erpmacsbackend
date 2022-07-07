const express = require("express");
const router = express.Router();

const upload = require("../../services/file-upload");
const notice_controller = require("../../controllers/admin/notice_controller");
const uploadFile = require("../../services/driveUpload");


router.get("/all", notice_controller.get_all);

router.post(
  "/create",
  upload.single("file"),
  uploadFile,
  notice_controller.create_new_notice,
);

module.exports = router;
