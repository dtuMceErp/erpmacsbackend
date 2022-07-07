const mongoose = require("mongoose");

const Faculty = require("../../models/faculty/faculty");
const User = require("../../models/user");

const send_formatted_response_handler = require("../../helper/HTTP_response_handler");

exports.get_all_faculty = (req, res, next) => {
  Faculty.aggregate([
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
      $match: {
        "user_id.is_active": true,
        "user_id.isVerifiedByAdmin": true,
        "user_id.isEmailVerified": true,
      },
    },
  ])
    .exec()
    .then((faculty) => {
      if (faculty) {
        return res
          .status(200)
          .json(send_formatted_response_handler(faculty, true, "ok"));
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

exports.get_faculty_by_id = (req, res, next) => {
  Faculty.findOne({ user_id: req.userData._id })
    .exec()
    .then((faculty) => {
      if (faculty) {
        res
          .status(200)
          .json(
            send_formatted_response_handler(
              { faculty: faculty, user: req.userData },
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
