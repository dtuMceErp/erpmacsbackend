const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const meetingSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  date: Date,
  purposeOfConduct: String,
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  venue: String,
  attachment: [{ url: String, label: String }],
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
  ],
  isLinkedTo: {
    type: Boolean,
    default: false,
    required: true,
  },
  linkedCommitee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Committee",
  },
});

module.exports = mongoose.model("Meeting", meetingSchema);
