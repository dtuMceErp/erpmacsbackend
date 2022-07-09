const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const documentSchema = new Schema(
  {
    serialNo: {
      type: String,
      required: true,
      unique: true,
      default: "None",
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    // added_by: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'Admin'
    // },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    important: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    category: {
      type: String,
      enum: [
        "B.TECH",
        "M.SC",
        "PHD",
        "DEPTARTMENT",
        "STAFF",
        "FACULTY",
        "OTHER",
      ],
      default: "DEPTARTMENT",
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

module.exports = mongoose.model("Documents", documentSchema);
