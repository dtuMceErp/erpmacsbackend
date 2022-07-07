const mongoose = require("mongoose");

const Experiences = require("../../models/student/experience");
const Students = require("../../models/student/student");
const send_formatted_reponse_handler = require("../../helper/HTTP_response_handler");

exports.create_new_experience = async (req, res, next) => {
  const Ops = {};
  Object.keys(req.body).forEach((key) => {
    if (key == "startDate" || key == "endDate")
      Ops[key] = new Date(req.body[key]);
    else Ops[key] = req.body[key];
  });
  const experience = new Experiences({
    _id: new mongoose.Types.ObjectId(),
    ...Ops,
  });

  try {
    const saved_experience = await experience.save();
    const updated_student = await Students.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $push: { experience_id: experience._id },
      },
      { new: true }
    );
    res
      .status(201)
      .json(
        send_formatted_reponse_handler(
          { experience: saved_experience, student: updated_student },
          true,
          "Experience added successfully"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(send_formatted_reponse_handler(err, false, "Something went wrong"));
  }
};

exports.get_experience_by_id = (req, res, next) => {
  Experiences.findById(req.params.id)
    .exec()
    .then((experience) => {
      if (experience) {
        res
          .status(200)
          .json(send_formatted_reponse_handler(experience, true, "ok"));
      } else {
        res
          .status(404)
          .json(
            send_formatted_reponse_handler("Not found", false, "Not found")
          );
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json(
          send_formatted_reponse_handler(err, false, "Something went wrong")
        );
    });
};

exports.update_experience_by_id = (req, res, next) => {
  const updateOps = {};
  Object.keys(req.body).forEach((key) => {
    if (key == "startDate" || key == "endDate")
      updateOps[key] = new Date(req.body[key]);
    else updateOps[key] = req.body[key];
  });

  Experiences.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updateOps },
    { new: true }
  )
    .exec()
    .then((experience) => {
      res
        .status(200)
        .json(
          send_formatted_reponse_handler(
            experience,
            true,
            "Experience updated successfully"
          )
        );
    })
    .catch((err) => {
      res
        .status(500)
        .json(
          send_formatted_reponse_handler(err, false, "Something went wrong")
        );
    });
};

exports.delete_experience_by_id = async (req, res, next) => {
  try {
    const deleted_experience = await Experiences.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    const updated_student = await Students.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $pull: { experience_id: req.params.id },
      },
      { new: true }
    );

    res
      .status(201)
      .json(
        send_formatted_reponse_handler(
          { student: updated_student },
          true,
          "Experience removed successfully"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(send_formatted_reponse_handler(err, false, "Something went wrong"));
  }
};
