const User = require("../models/user");
const Students = require("../models/student/student");
const send_formatted_response_handler = require("../helper/HTTP_response_handler");

exports.student_signup_validator = async (req, res, next) => {
  //   const ALL_ERROR = [];
  try {
    const is_email_in_USER = await User.findOne({ email: req.body.email });
    const is_rollno_in_STUDENT = await Students.findOne({
      roll_no: req.body.roll_no,
    });

    if (!is_rollno_in_STUDENT && !is_email_in_USER) next();
    if (is_email_in_USER || is_rollno_in_STUDENT) {
      // ALL_ERROR.push("Student account already exist!");
      return res
        .status(409)
        .json(
          send_formatted_response_handler(
            { ...is_email_in_USER, ...is_rollno_in_STUDENT },
            false,
            "User Already exists"
          )
        );
    }
  } catch (err) {
    return res
      .status(500)
      .json(
        send_formatted_response_handler(err, false, "Something went wrong")
      );
  }
  //   if (ALL_ERROR.length) {
  //   }
};

exports.faculty_validator = async (req, res, next) => {};
exports.admin_validator = async (req, res, next) => {};
