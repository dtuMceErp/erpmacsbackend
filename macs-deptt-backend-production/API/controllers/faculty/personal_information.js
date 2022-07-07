const mongoose = require("mongoose");

const Faculty = require("../../models/faculty/faculty");
const User = require("../../models/user");

const send_formatted_response_handler = require("../../helper/HTTP_response_handler");

exports.update_personal_information_by_id = async (req, res, next) => {
  try {
    const updateOps = {};
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });
    console.log(updateOps);
    console.log(req.body);
    const updated_faculty = await Faculty.findOneAndUpdate(
      { user_id: req.userData._id },
      {
        $set: {
          "personalInformation.phone": updateOps.phone,
          "personalInformation.fatherName": updateOps.fatherName,
          "personalInformation.motherName": updateOps.motherName,
          "personalInformation.spouseName": updateOps.spouseName,
          "personalInformation.dob": updateOps.dob,
          "personalInformation.category": updateOps.category,
          "personalInformation.correspondenceAddress":
            updateOps.correspondenceAddress,
          "personalInformation.permanentAddress": updateOps.permanentAddress,
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
          "Personal Information Updated Successfully"
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
