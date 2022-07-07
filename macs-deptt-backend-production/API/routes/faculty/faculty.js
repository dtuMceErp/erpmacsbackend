const express = require("express");
const router = express.Router();
const checkIsAdminVerified = require("../../helper/check-is-admin-verified");
const checkAuth = require("../../helper/check-auth");

// Controllers
const faculty_controller = require("../../controllers/faculty/faculty_controller");
const personal_information_controller = require("../../controllers/faculty/personal_information");
const academic_qualification_controller = require("../../controllers/faculty/academic_qualification");
const publication_controller = require("../../controllers/faculty/publication");
const professional_activities_controller = require("../../controllers/faculty/professionalActivities");
const experience_controller = require("../../controllers/faculty/experience");

//Validators
const experience_validator = require("../../validators/faculty/experience_validation");
const professional_activities_validator = require("../../validators/faculty/professional_activities_validation");
const publication_validator = require("../../validators/faculty/publication_validation");

// Faculty Routes
router.get("/", checkAuth, faculty_controller.get_faculty_by_id);
router.get("/all", faculty_controller.get_all_faculty);

// Personal Information Routes
router.patch(
  "/personal/update/",
  checkAuth,
  checkIsAdminVerified,
  personal_information_controller.update_personal_information_by_id
);

// Academic Qualification Routes
router.patch(
  "/academics/graduate/update/",
  checkAuth,
  checkIsAdminVerified,
  academic_qualification_controller.update_graduate_degree_by_id
);

router.patch(
  "/academics/postgraduate/update/",
  checkAuth,
  checkIsAdminVerified,
  academic_qualification_controller.update_post_graduate_degree_by_id
);

router.patch(
  "/academics/phd/update/",
  checkAuth,
  checkIsAdminVerified,
  academic_qualification_controller.update_PHD_by_id
);

// Publication Routes
router.post(
  "/publication/create/",
  checkAuth,
  checkIsAdminVerified,
  publication_validator.publication_validator,
  publication_controller.create_publication
);

router.patch(
  "/publication/update/:id",
  checkAuth,
  checkIsAdminVerified,
  publication_validator.publication_validator,
  publication_controller.update_publication_by_id
);

router.delete(
  "/publication/delete/:id",
  checkAuth,
  checkIsAdminVerified,
  publication_controller.delete_publication_by_id
);

// Activites Routes
router.post(
  "/activities/create/",
  checkAuth,
  checkIsAdminVerified,
  professional_activities_validator.professional_activities_validator,
  professional_activities_controller.create_professional_activities
);

router.patch(
  "/activities/update/:id",
  checkAuth,
  checkIsAdminVerified,
  professional_activities_validator.professional_activities_validator,
  professional_activities_controller.update_professional_activity_by_id
);

router.delete(
  "/activities/delete/:id",
  checkAuth,
  checkIsAdminVerified,
  professional_activities_controller.delete_professional_activity_by_id
);

// Experience Routes
router.patch(
  "/experience/teaching/update",
  checkAuth,
  checkIsAdminVerified,
  experience_controller.update_teaching_experience_by_id
);

router.patch(
  "/experience/research/update",
  checkAuth,
  checkIsAdminVerified,
  experience_controller.update_research_experience_by_id
);

router.post(
  "/experience/create/",
  checkAuth,
  checkIsAdminVerified,
  experience_validator.experience_validator,
  experience_controller.create_experience
);

router.patch(
  "/experience/update/:id",
  checkAuth,
  checkIsAdminVerified,
  experience_validator.experience_validator,
  experience_controller.update_experience_by_id
);

router.delete(
  "/experience/delete/:id",
  checkAuth,
  checkIsAdminVerified,
  experience_controller.delete_experience_by_id
);

module.exports = router;
