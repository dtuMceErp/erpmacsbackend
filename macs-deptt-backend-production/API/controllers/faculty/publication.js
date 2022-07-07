const mongoose = require("mongoose");

const Faculty = require("../../models/faculty/faculty");

const send_formatted_response_handler = require("../../helper/HTTP_response_handler");

exports.create_publication = async (req, res, next) => {
  try {
    const updateOps = {};
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    const updated_faculty = await Faculty.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $push: {
          publications: updateOps,
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
          "Publication Added Successfully"
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

exports.update_publication_by_id = async (req, res, next) => {
  try {
    const updateOps = {};
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    const updated_faculty = await Faculty.findOneAndUpdate(
      { user_id: req.userData._id, "publications._id": req.params.id },
      {
        $set: {
          "publications.$": updateOps,
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
          "Publication Updated Successfully"
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

exports.delete_publication_by_id = async (req, res, next) => {
  try {
    const updated_faculty = await Faculty.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $pull: {
          publications: { _id: req.params.id },
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
          "Publication Deleted Successfully"
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
