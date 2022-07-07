const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    roll_no: {
      type: String,
      required: [true, "Roll no can't be null"],
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
    experience_id: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Experience" },
    ],
    project_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    research_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Research" }],
    achievement_id: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Achievement" },
    ],
    certification_id: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Certification" },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
