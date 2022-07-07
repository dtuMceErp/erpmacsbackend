const mongoose = require("mongoose");

const Acheivements = require("../../models/student/achievement");
const Students = require("../../models/student/student");
const send_formatted_reponse_handler = require("../../helper/HTTP_response_handler");

exports.create_new_achievement = async (req, res, next) => {
  const achievement = new Acheivements({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    achievementType: req.body.achievementType,
    SupportURL: req.body.SupportURL,
  });

  try {
    const saved_achievement = await achievement.save();
    const updated_student = await Students.findOneAndUpdate(
      { user_id: req.userData._id },
      { $push: { achievement_id: saved_achievement._id } },
      { new: true }
    );
    res
      .status(201)
      .json(
        send_formatted_reponse_handler(
          { achievement: saved_achievement, student: updated_student },
          true,
          "Achievement added successfully"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(send_formatted_reponse_handler(err, false, "Something went wrong"));
  }
};

exports.get_achievement_by_id = (req, res, next) => {
  Acheivements.findById(req.params.id)
    .exec()
    .then((achievement) => {
      if (achievement) {
        res
          .status(200)
          .json(send_formatted_reponse_handler(achievement, true, "ok"));
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

exports.update_achievement_by_id = (req, res, next) => {
  const updateOps = {};
  Object.keys(req.body).forEach((key) => {
    updateOps[key] = req.body[key];
  });

  Acheivements.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updateOps },
    { new: true }
  )
    .exec()
    .then((achievement) => {
      res
        .status(200)
        .json(
          send_formatted_reponse_handler(
            achievement,
            true,
            "Achievement updated successfully"
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

exports.delete_achievement_by_id = async (req, res, next) => {
  try {
    const deleted_achievement = await Acheivements.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    const updated_student = await Students.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $pull: { achievement_id: req.params.id },
      },
      { new: true }
    );
    res
      .status(201)
      .json(
        send_formatted_reponse_handler(
          { student: updated_student },
          true,
          "Achievement removed successfully"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(send_formatted_reponse_handler(err, false, "Something went wrong"));
  }
};
