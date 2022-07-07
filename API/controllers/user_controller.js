const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Students = require("../models/student/student");
const Faculty = require("../models/faculty/faculty");
const send_formatted_response_handler = require("../helper/HTTP_response_handler");
const email = require("../services/sendEmail");

exports.user_signup = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const new_user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    });
    const saved_user = await new_user.save();

    //Student
    if (saved_user.role == "Student") {
      const new_student = new Students({
        _id: new mongoose.Types.ObjectId(),
        roll_no: req.body.roll_no,
        user_id: new_user._id,
      });
      const saved_student = await new_student.save();

      // email.sendConfirmationEmail(saved_user);

      res
        .status(201)
        .json(
          send_formatted_response_handler(
            { user: saved_user, student: saved_student },
            true,
            "User created successfully"
          )
        );
    }

    //Faculty
    else if (saved_user.role == "Faculty") {
      const new_faculty = new Faculty({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        user_id: new_user._id,
        personalInformation: { email: req.body.email },
      });
      const saved_faculty = await new_faculty.save();
      // email.sendConfirmationEmail(saved_user);

      res
        .status(201)
        .json(
          send_formatted_response_handler(
            { user: saved_user, faculty: saved_faculty },
            true,
            "User created successfully"
          )
        );
    }
  } catch (err) {
    res
      .status(500)
      .json(
        send_formatted_response_handler(err, false, "Something went wrong")
      );
  }
};

exports.user_login = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email, is_active: true });
    if (user.length < 1) {
      return res
        .status(401)
        .json(
          send_formatted_response_handler(user, false, "User doesn't exist")
        );
    }
    if (user[0].isEmailVerified == false) {
      return res
        .status(401)
        .json(
          send_formatted_response_handler(
            user,
            false,
            "Please verify your email"
          )
        );
    }

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (match) {
      const token = jwt.sign(
        {
          email: user[0].email,
          _id: user[0]._id,
          role: user[0].role,
          name: user[0].name,
          isVerifiedByAdmin: user[0].isVerifiedByAdmin,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1d",
        }
      );
      return res
        .status(200)
        .json(
          send_formatted_response_handler(
            { token: token, role: user[0].role, name: user[0].name },
            true,
            "Authorization successful"
          )
        );
    }
    return res
      .status(401)
      .json(
        send_formatted_response_handler(err, false, "Authorization failed")
      );
  } catch (err) {
    res
      .status(401)
      .json(
        send_formatted_response_handler(err, false, "Password is incorrect")
      );
  }
};

exports.deactivate_user = (req, res, next) => {
  User.updateMany(
    { _id: { $in: req.body.users } },
    { $set: { is_active: false } }
  )
    .exec()
    .then((result) => {
      res
        .status(200)
        .json(
          send_formatted_response_handler(
            result,
            true,
            "Users deactivated successfully"
          )
        );
    })
    .catch((err) => {
      // console.log(err);
      res
        .status(500)
        .json(
          send_formatted_response_handler(err, false, "Something went wrong")
        );
    });
};

exports.get_all_students_for_admin_verification = (req, res, next) => {
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
      $match: {
        "user_id.isVerifiedByAdmin": false,
        "user_id.is_active": true,
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

exports.get_all_faculty_for_admin_verification = (req, res, next) => {
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
        "user_id.isVerifiedByAdmin": false,
        "user_id.is_active": true,
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

exports.verify_by_admin = async (req, res, next) => {
  if (req.userData.role != "Admin") {
    return res
      .status(403)
      .json(send_formatted_response_handler(err, false, "Forbidden"));
  }

  try {
    const users = await User.updateMany(
      { _id: { $in: req.body.users } },
      { $set: { isVerifiedByAdmin: true } }
    );
    res
      .status(200)
      .json(send_formatted_response_handler(users, true, "User verified"));
  } catch (err) {
    res
      .status(500)
      .json(
        send_formatted_response_handler(err, false, "Something went wrong")
      );
  }
};

exports.delete_verify_student = async (req, res, next) => {
  if (req.userData.role != "Admin") {
    return res
      .status(403)
      .json(send_formatted_response_handler(err, false, "Forbidden"));
  }
  try {
    const users = await User.deleteMany({ _id: { $in: req.body.users } });
    const students = await Students.deleteMany({
      user_id: { $in: req.body.users },
    });
    res
      .status(200)
      .json(
        send_formatted_response_handler(
          { users: users, students: students },
          true,
          "Students Deleted"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(
        send_formatted_response_handler(err, false, "Something went wrong")
      );
  }
};

exports.delete_verify_faculty = async (req, res, next) => {
  if (req.userData.role != "Admin") {
    return res
      .status(403)
      .json(send_formatted_response_handler(err, false, "Forbidden"));
  }
  try {
    const users = await User.deleteMany({ _id: { $in: req.body.users } });
    const faculty = await Faculty.deleteMany({
      user_id: { $in: req.body.users },
    });
    res
      .status(200)
      .json(
        send_formatted_response_handler(
          { users: users, faculty: faculty },
          true,
          "Faculties Deleted"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(
        send_formatted_response_handler(err, false, "Something went wrong")
      );
  }
};
