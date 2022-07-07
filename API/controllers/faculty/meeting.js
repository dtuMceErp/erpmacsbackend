const mongoose = require("mongoose");

const Meeting = require("../../models/faculty/meetings");

const send_formatted_response_handler = require("../../helper/HTTP_response_handler");
const Faculty = require("../../models/faculty/faculty");

exports.create_meeting = async (req, res, next) => {
  try {
    const updateOps = {};
    const idx = req.body.participants.indexOf(req.body.organizer);
    if (idx > -1) req.body.participants.splice(idx, 1);
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    const new_meeting = new Meeting({
      ...updateOps,
      _id: new mongoose.Types.ObjectId(),
    });

    const saved_meeting = await new_meeting.save();

    res
      .status(200)
      .json(
        send_formatted_response_handler(
          { meeting: saved_meeting },
          true,
          "Meeting created Successfully"
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

exports.get_all_meeting = async (req, res, next) => {
  try {
    const today = new Date();

    if (req.userData.role == "Admin") {
      const upcomingMeetings = await Meeting.find({
        date: { $gte: today },
      }).populate("organizer");
      const pastMeetings = await Meeting.find({
        date: { $lt: today },
      }).populate("organizer");
      res
        .status(200)
        .json(
          send_formatted_response_handler(
            { upcomingMeetings: upcomingMeetings, pastMeetings: pastMeetings },
            true,
            "Ok"
          )
        );
    } else if (req.userData.role == "Faculty") {
      const faculty = await Faculty.findOne({ user_id: req.userData._id });

      const upcomingParticipantMeetings = await Meeting.find({
        participants: faculty._id,
        date: { $gte: today },
      }).populate("organizer");

      const upcomingOrganizerMeetings = await Meeting.find({
        organizer: faculty._id,
        date: { $gte: today },
      }).populate("organizer");

      const pastParticipantMeetings = await Meeting.find({
        participants: faculty._id,
        date: { $lt: today },
      }).populate("organizer");

      const pastOrganizerMeetings = await Meeting.find({
        organizer: faculty._id,
        date: { $lt: today },
      }).populate("organizer");

      res.status(200).json(
        send_formatted_response_handler({
          upcomingParticipantMeetings: upcomingParticipantMeetings,
          pastParticipantMeetings: pastParticipantMeetings,
          upcomingOrganizerMeetings: upcomingOrganizerMeetings,
          pastOrganizerMeetings: pastOrganizerMeetings,
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

exports.get_meeting_by_id = async (req, res, next) => {
  try {
    const meetings = await Meeting.findOne({
      _id: req.params.id,
    });
    res
      .status(200)
      .json(
        send_formatted_response_handler({ meetings: meetings }, true, "Ok")
      );
  } catch (err) {
    res
      .status(500)
      .json(
        send_formatted_response_handler(err, false, "Something went wrong")
      );
  }
};

exports.update_meeting_by_id = async (req, res, next) => {
  try {
    const updateOps = {};
    Object.keys(req.body).forEach((key) => {
      updateOps[key] = req.body[key];
    });

    const updated_meeting = await Meeting.findOneAndUpdate(
      {
        _id: req.params.id,
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
          { meeting: updated_meeting },
          true,
          "Meeting Updated Successfully"
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

exports.delete_meeting_by_id = async (req, res, next) => {
  try {
    const deleted_meeting = await Meeting.findOneAndDelete({
      _id: req.params.id,
    });

    res
      .status(200)
      .json(
        send_formatted_response_handler(
          { meeting: deleted_meeting },
          true,
          "Meeting Deleted Successfully"
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
