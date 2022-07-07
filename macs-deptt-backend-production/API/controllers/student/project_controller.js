const mongoose = require("mongoose");

const Projects = require("../../models/student/project");
const Students = require("../../models/student/student");
const send_formatted_reponse_handler = require("../../helper/HTTP_response_handler");

exports.create_new_project = async (req, res, next) => {
  const Ops = {};
  Object.keys(req.body).forEach((key) => {
    if (key == "startDate" || key == "endDate")
      Ops[key] = new Date(req.body[key]);
    else Ops[key] = req.body[key];
  });
  const project = new Projects({
    _id: new mongoose.Types.ObjectId(),
    ...Ops,
  });

  try {
    const saved_project = await project.save();
    const updated_student = await Students.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $push: { project_id: saved_project._id },
      },
      { new: true }
    );
    res
      .status(201)
      .json(
        send_formatted_reponse_handler(
          { project: saved_project, student: updated_student },
          true,
          "Project added successfully"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(send_formatted_reponse_handler(err, false, "Something went wrong"));
  }
};

exports.get_project_by_id = (req, res, next) => {
  Projects.findById(req.params.id)
    .exec()
    .then((project) => {
      if (project) {
        res
          .status(200)
          .json(send_formatted_reponse_handler(project, true, "ok"));
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

exports.update_project_by_id = (req, res, next) => {
  const updateOps = {};
  Object.keys(req.body).forEach((key) => {
    if (key == "startDate" || key == "endDate")
      updateOps[key] = new Date(req.body[key]);
    else updateOps[key] = req.body[key];
  });

  Projects.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updateOps },
    { new: true }
  )
    .exec()
    .then((project) => {
      res
        .status(200)
        .json(
          send_formatted_reponse_handler(
            project,
            true,
            "Project updated successfully"
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

exports.delete_project_by_id = async (req, res, next) => {
  try {
    const deleted_project = await Projects.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    const updated_student = await Students.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $pull: { project_id: req.params.id },
      },
      { new: true }
    );

    res
      .status(201)
      .json(
        send_formatted_reponse_handler(
          { student: updated_student },
          true,
          "Project removed successfully"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(send_formatted_reponse_handler(err, false, "Something went wrong"));
  }
};
