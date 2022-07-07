const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: [true, "Job Title can't be left blank"] },
    company: {
      type: String,
      required: [true, "Company Name can't be left blank"],
    },
    description: {
      type: String,
      required: [true, "Description can't be left blank"],
      max: 200,
    },
    startDate: { type: Date, required: [true, "Start Date can't be empty"] },
    endDate: { type: Date, default: null },
    isOngoing: { type: Boolean, default: false },
    employmentType: {
      type: String,
      enum: {
        values: [
          "Full-time",
          "Part-time",
          "Internship",
          "Trainee",
          "Freelancer",
        ],
        message: "Invalid Employment Type",
      },
      required: [true, "Employment Type can't be empty"],
    },
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

module.exports = mongoose.model("Experience", experienceSchema);
