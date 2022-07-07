const mongoose = require("mongoose");

const achievementSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: [true, "Research Title can't be left blank"],
    },
    achievementType: {
      type: String,
      enum: {
        values: [
          "Music",
          "Dance",
          "Debate",
          "Coding",
          "Academic",
          "Sports",
          "Other",
        ],
        message: "Invalid Achievement Type",
      },
      required: [true, "Achievement Type can't be left blank"],
    },
    description: {
      type: String,
      required: [true, "Description can't be left blank"],
      max: 200,
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

module.exports = mongoose.model("Achievement", achievementSchema);
