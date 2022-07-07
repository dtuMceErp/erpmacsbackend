const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: [true, "Project Title can't be left blank"],
    },
    description: {
      type: String,
      required: [true, "Description can't be left blank"],
      max: 200,
    },
    startDate: { type: Date, required: [true, "Start Date can't be empty"] },
    endDate: { type: Date, default: null },
    isOngoing: { type: Boolean, default: false },
    projectType: {
      type: String,
      enum: {
        values: ["Major", "Minor", "Personal", "Mini"],
        message: "Invalid Project Type",
      },
      required: [true, "Project Type can't be empty"],
    },
    SupportURL: {
      type: String,
      required: [true, "URL can't be empty"],
      match: [
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
        "Invalid URL",
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

module.exports = mongoose.model("Project", projectSchema);
