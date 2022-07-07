const mongoose = require("mongoose");

const Committee = require("../../models/faculty/commitee");

const send_formatted_response_handler = require("../../helper/HTTP_response_handler");
const Faculty = require("../../models/faculty/faculty");

exports.get_all_committee = async (req, res, next) => {
  try {
    if (req.userData.role == "Admin") {
      const committees = await Committee.find({ isDeleted: false }).populate(
        "chairPerson"
      );
      res
        .status(200)
        .json(
          send_formatted_response_handler(
            { committees: committees },
            true,
            "Ok"
          )
        );
    } else if (req.userData.role == "Faculty") {
      const faculty = await Faculty.findOne({ user_id: req.userData._id });
      // console.log(faculty);
      const chairpersonCommittee = await Committee.find({
        chairPerson: faculty._id,
      }).populate("chairPerson");
      const memberCommittee = await Committee.find({
        members: faculty._id,
      }).populate("chairPerson");

      res.status(200).json(
        send_formatted_response_handler({
          chairpersonCommittee: chairpersonCommittee,
          memberCommittee: memberCommittee,
        }),
        true,
        "Ok"
      );
    }
  } catch (err) {
    res
      .status(500)
      .json(
        send_formatted_response_handler(err, false, "Something went wrong")
      );
  }
};

exports.get_committee_by_id = async (req, res, next) => {
  try {
    const committees = await Committee.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    res
      .status(200)
      .json(
        send_formatted_response_handler({ committees: committees }, true, "Ok")
      );
  } catch (err) {
    res
      .status(500)
      .json(
        send_formatted_response_handler(err, false, "Something went wrong")
      );
  }
};

exports.create_committee = async (req, res, next) => {
  try {
    const updateOps = {};

    const idx = req.body.members.indexOf(req.body.chairPerson);
    if (idx > -1) req.body.members.splice(idx, 1);
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    console.log(updateOps);
    const new_committee = new Committee({
      ...updateOps,
      _id: new mongoose.Types.ObjectId(),
    });

    const saved_committee = await new_committee.save();

    res
      .status(200)
      .json(
        send_formatted_response_handler(
          { committee: saved_committee },
          true,
          "Committee created Successfully"
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

exports.update_committee_by_id = async (req, res, next) => {
  try {
    const updateOps = {};
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    const updated_committee = await Committee.findOneAndUpdate(
      {
        _id: req.params.id,
        isDeleted: false,
      },
      {
        $set: updateOps,
      },
      { new: true }
    );

    res
      .status(200)
      .json(
        send_formatted_response_handler(
          { committee: updated_committee },
          true,
          "Committee Updated Successfully"
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

exports.delete_committee_by_id = async (req, res, next) => {
  try {
    const updated_committee = await Committee.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isDeleted: true,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json(
        send_formatted_response_handler(
          { committee: updated_committee },
          true,
          "Committee Deleted Successfully"
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
