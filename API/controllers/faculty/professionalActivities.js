const mongoose = require("mongoose");

const Faculty = require("../../models/faculty/faculty");

const send_formatted_response_handler = require("../../helper/HTTP_response_handler");

exports.create_professional_activities = async (req, res, next) => {
  try {
    const updateOps = {};
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    const updated_faculty = await Faculty.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $push: {
          professionalActivities: updateOps,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json(
        send_formatted_response_handler(
          { faculty: updated_faculty },
          true,
          "Professional Activity Added Successfully"
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

exports.update_professional_activity_by_id = async (req, res, next) => {
  try {
    const updateOps = {};
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    const updated_faculty = await Faculty.findOneAndUpdate(
      {
        user_id: req.userData._id,
        "professionalActivities._id": req.params.id,
      },
      {
        $set: {
          "professionalActivities.$": updateOps,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json(
        send_formatted_response_handler(
          { faculty: updated_faculty },
          true,
          "Professional Activity Updated Successfully"
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

exports.delete_professional_activity_by_id = async (req, res, next) => {
  try {
    const updated_faculty = await Faculty.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $pull: {
          professionalActivities: { _id: req.params.id },
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json(
        send_formatted_response_handler(
          { faculty: updated_faculty },
          true,
          "Professional Acitivty Deleted Successfully"
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
