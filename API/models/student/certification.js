const mongoose = require("mongoose");

const certificationSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: [true, "Research Title can't be left blank"],
    },
    issuingOrganisation: {
      type: String,
      required: [true, "Issuing Organisation can't be left blank"],
    },
    issueDate: { type: Date, required: [true, "Issue Date can't be empty"] },
    SupportURL: {
      type: String,
      required: [true, "URL can't be empty"],
      match: [
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
        "URL is invalid",
      ],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Certification", certificationSchema);
