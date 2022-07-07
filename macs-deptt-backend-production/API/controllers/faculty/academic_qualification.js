const mongoose = require("mongoose");

const Faculty = require("../../models/faculty/faculty");

const send_formatted_response_handler = require("../../helper/HTTP_response_handler");

exports.update_graduate_degree_by_id = async (req, res, next) => {
  try {
    const updateOps = {};
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    const updated_faculty = await Faculty.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $set: {
          "academicQualifications.graduateDegree.university":
            updateOps.university,
          "academicQualifications.graduateDegree.degree": updateOps.degree,
          "academicQualifications.graduateDegree.isOngoing":
            updateOps.isOngoing,
          "academicQualifications.graduateDegree.passingYear":
            updateOps.passingYear,
          "academicQualifications.graduateDegree.specialization":
            updateOps.specialization,
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
          "Graduate Degree Updated Successfully"
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

exports.update_post_graduate_degree_by_id = async (req, res, next) => {
  try {
    const updateOps = {};
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    const updated_faculty = await Faculty.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $set: {
          "academicQualifications.postGraduateDegree.university":
            updateOps.university,
          "academicQualifications.postGraduateDegree.degree": updateOps.degree,
          "academicQualifications.postGraduateDegree.isOngoing":
            updateOps.isOngoing,
          "academicQualifications.postGraduateDegree.passingYear":
            updateOps.passingYear,
          "academicQualifications.postGraduateDegree.specialization":
            updateOps.specialization,
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
          "Post Graduate Degree Updated Successfully"
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

exports.update_PHD_by_id = async (req, res, next) => {
  try {
    const updateOps = {};
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    const updated_faculty = await Faculty.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $set: {
          "academicQualifications.PHD.university": updateOps.university,
          "academicQualifications.PHD.degree": updateOps.degree,
          "academicQualifications.PHD.isOngoing": updateOps.isOngoing,
          "academicQualifications.PHD.passingYear": updateOps.passingYear,
          "academicQualifications.PHD.specialization": updateOps.specialization,
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
          "PHD Updated Successfully"
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
