const mongoose = require("mongoose");

const Researches = require("../../models/student/research");
const Students = require("../../models/student/student");
const send_formatted_reponse_handler = require("../../helper/HTTP_response_handler");

exports.create_new_research = async (req, res, next) => {
  const Ops = {};
  Object.keys(req.body).forEach((key) => {
    if (key == "publicationDate") Ops[key] = new Date(req.body[key]);
    else Ops[key] = req.body[key];
  });
  const research = new Researches({
    _id: new mongoose.Types.ObjectId(),
    ...Ops,
  });

  try {
    const saved_research = await research.save();
    const updated_student = await Students.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $push: { research_id: research._id },
      },
      { new: true }
    );
    res
      .status(201)
      .json(
        send_formatted_reponse_handler(
          { research: saved_research, student: updated_student },
          true,
          "Research added successfully"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(send_formatted_reponse_handler(err, false, "Something went wrong"));
  }
};

exports.get_research_by_id = (req, res, next) => {
  Researches.findById(req.params.id)
    .exec()
    .then((research) => {
      if (research) {
        res
          .status(200)
          .json(send_formatted_reponse_handler(research, true, "ok"));
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

exports.update_research_by_id = (req, res, next) => {
  const updateOps = {};
  Object.keys(req.body).forEach((key) => {
    if (key == "publicationDate") updateOps[key] = new Date(req.body[key]);
    else updateOps[key] = req.body[key];
  });

  Researches.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updateOps },
    { new: true }
  )
    .exec()
    .then((research) => {
      res
        .status(200)
        .json(
          send_formatted_reponse_handler(
            research,
            true,
            "Research updated successfully"
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

exports.delete_research_by_id = async (req, res, next) => {
  try {
    const deleted_research = await Researches.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    const updated_student = await Students.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $pull: { research_id: req.params.id },
      },
      { new: true }
    );
    res
      .status(201)
      .json(
        send_formatted_reponse_handler(
          { student: updated_student },
          true,
          "Research removed successfully"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(send_formatted_reponse_handler(err, false, "Something went wrong"));
  }
};
