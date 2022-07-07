const mongoose = require("mongoose");

const Faculty = require("../../models/faculty/faculty");

const send_formatted_response_handler = require("../../helper/HTTP_response_handler");

exports.create_experience = async (req, res, next) => {
  try {
    const updateOps = {};
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    const updated_faculty = await Faculty.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $push: {
          "experience.experience": updateOps,
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
          "Experience Added Successfully"
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

exports.update_experience_by_id = async (req, res, next) => {
  try {
    const updateOps = {};
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    const updated_faculty = await Faculty.findOneAndUpdate(
      {
        user_id: req.userData._id,
        "experience.experience._id": req.params.id,
      },
      {
        $set: {
          "experience.experience.$": updateOps,
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
          "Experience Updated Successfully"
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

exports.delete_experience_by_id = async (req, res, next) => {
  try {
    const updated_faculty = await Faculty.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $pull: {
          "experience.experience": { _id: req.params.id },
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
          "Experience Deleted Successfully"
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

exports.update_research_experience_by_id = async (req, res, next) => {
  try {
    const updateOps = {};
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    const updated_faculty = await Faculty.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $set: {
          "experience.researchExperience": updateOps,
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
          "Research Experience Updated Successfully"
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

exports.update_teaching_experience_by_id = async (req, res, next) => {
  try {
    const updateOps = {};
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    const updated_faculty = await Faculty.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $set: {
          "experience.teachingExperience": updateOps,
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
          "Teaching Experience Updated Successfully"
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
