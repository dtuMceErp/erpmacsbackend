const express = require("express");
const router = express.Router();

const uplaod = require("../services/file-upload");
const notice_controller = require("../controllers/notice_controller");

// router.get('/all', notice_controller.get_all);

// router.get('/:id', notice_controller.get_specific_noitce);

// router.post('/create', uplaod.single("image"), notice_controller.create_new_notice);

// router.put('/update/:id', notice_controller.update_notice_details);

// router.put('/update/image/:id', uplaod.single("image"), notice_controller.update_notice_file);

// router.delete('/:id', notice_controller.delete_using_id);

module.exports = router;
