const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer();
const notice_controller = require("../../controllers/admin/notice_controller");
const uploadFile = require("../../services/driveUpload");


router.get("/all", notice_controller.get_all);

router.post(
  "/create", upload.any(), uploadFile,
  notice_controller.create_new_notice,
);

module.exports = router;
