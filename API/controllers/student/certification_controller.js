const mongoose = require("mongoose");

const Certifications = require("../../models/student/certification");
const Students = require("../../models/student/student");
const send_formatted_reponse_handler = require("../../helper/HTTP_response_handler");

exports.create_new_certificaton = async (req, res, next) => {
  const Ops = {};
  Object.keys(req.body).forEach((key) => {
    if (key == "issueDate") Ops[key] = new Date(req.body[key]);
    else Ops[key] = req.body[key];
  });
  const certification = new Certifications({
    _id: new mongoose.Types.ObjectId(),
    ...Ops,
  });
  try {
    const saved_certification = await certification.save();
    const updated_student = await Students.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $push: { certification_id: certification._id },
      },
      { new: true }
    );
    res
      .status(201)
      .json(
        send_formatted_reponse_handler(
          { certification: saved_certification, student: updated_student },
          true,
          "Certification added successfully"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(send_formatted_reponse_handler(err, false, "Something went wrong"));
  }
};

exports.get_certification_by_id = (req, res, next) => {
  Certifications.findById(req.params.id)
    .exec()
    .then((certification) => {
      if (certification) {
        res
          .status(200)
          .json(send_formatted_reponse_handler(certification, true, "ok"));
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

exports.update_certification_by_id = (req, res, next) => {
  const updateOps = {};
  Object.keys(req.body).forEach((key) => {
    if (key == "issueDate") updateOps[key] = new Date(req.body[key]);
    else updateOps[key] = req.body[key];
  });

  Certifications.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updateOps },
    { new: true }
  )
    .exec()
    .then((certification) => {
      res
        .status(200)
        .json(
          send_formatted_reponse_handler(
            certification,
            true,
            "Certification updated successfully"
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

exports.delete_certification_by_id = async (req, res, next) => {
  try {
    const deleted_certification = await Certifications.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    const updated_student = await Students.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $pull: { certification_id: req.params.id },
      },
      { new: true }
    );
    res
      .status(201)
      .json(
        send_formatted_reponse_handler(
          { student: updated_student },
          true,
          "Certification removed successfully"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(send_formatted_reponse_handler(err, false, "Something went wrong"));
  }
};
