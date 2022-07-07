const mongoose = require("mongoose");

const Students = require("../../models/student/student");
const User = require("../../models/user");
const Project = require("../../models/student/project");
const Achievement = require("../../models/student/achievement");
const Experience = require("../../models/student/experience");
const Certification = require("../../models/student/certification");
const Research = require("../../models/student/research");

const send_formatted_response_handler = require("../../helper/HTTP_response_handler");

exports.get_all_students = (req, res, next) => {
  Students.aggregate([
    {
      $lookup: {
        from: User.collection.name,
        localField: "user_id",
        foreignField: "_id",
        as: "user_id",
      },
    },
    {
      $unwind: "$user_id",
    },
    {
      $lookup: {
        from: Project.collection.name,
        localField: "project_id",
        foreignField: "_id",
        as: "project_id",
      },
    },
    {
      $lookup: {
        from: Experience.collection.name,
        localField: "experience_id",
        foreignField: "_id",
        as: "experience_id",
      },
    },
    {
      $lookup: {
        from: Research.collection.name,
        localField: "research_id",
        foreignField: "_id",
        as: "research_id",
      },
    },
    {
      $lookup: {
        from: Achievement.collection.name,
        localField: "achievement_id",
        foreignField: "_id",
        as: "achievement_id",
      },
    },
    {
      $lookup: {
        from: Certification.collection.name,
        localField: "certification_id",
        foreignField: "_id",
        as: "certification_id",
      },
    },
    {
      $match: {
        "user_id.is_active": true,
        "user_id.isVerifiedByAdmin": true,
        "user_id.isEmailVerified": true,
      },
    },
  ])
    .exec()
    .then((student) => {
      if (student) {
        return res
          .status(200)
          .json(send_formatted_response_handler(student, true, "ok"));
      }
    })
    .catch((err) => {
      return res
        .status(500)
        .json(
          send_formatted_response_handler(err, false, "Something went wrong")
        );
    });
};

exports.get_student_by_id = (req, res, next) => {
  Students.findOne({ user_id: req.userData._id })
    .populate(
      "experience_id project_id research_id achievement_id certification_id"
    )
    .exec()
    .then((student) => {
      if (student) {
        res
          .status(200)
          .json(
            send_formatted_response_handler(
              { student: student, user: req.userData },
              true,
              "ok"
            )
          );
      } else {
        res
          .status(404)
          .json(
            send_formatted_response_handler("Not found", false, "Not found")
          );
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json(
          send_formatted_response_handler(err, false, "Something went wrong")
        );
    });
};
