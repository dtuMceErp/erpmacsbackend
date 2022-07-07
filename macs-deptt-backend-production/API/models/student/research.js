const mongoose = require("mongoose");

const researchSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: [true, "Research Title can't be left blank"],
    },
    publisher: {
      type: String,
      required: [true, "Publisher can't be left blank"],
    },
    isOngoing: {
      type: Boolean,
      default: false,
    },
    publicationDate: {
      type: Date,
      default: null,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
    SupportURL: {
      type: String,
      required: [true, "URL can't be empty"],
      match: [
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
        "URL is invalid",
      ],
    },
    description: {
      type: String,
      required: [true, "Description can't be left blank"],
      max: 200,
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

module.exports = mongoose.model("Research", researchSchema);
