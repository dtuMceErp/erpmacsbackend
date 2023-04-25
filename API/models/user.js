const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: [true, "Name can't be left blank"],
    },
    email: {
      type: String,
      required: [true, "Email can't be left blank"],
      unique: true,
      validate: {
        validator: function (emailID) {
          return emailID.includes("@dtu.ac.in");
        },
        message: "Enter DTU email ID",
      },
    },
    password: {
      type: String,
      required: [true, "Password can't be left blank"],
    },
    role: {
      type: String,
      enum: ["Admin", "Faculty", "Student", "Staff"],
      required: [true, "Role can't be left blank"],
    },
    isVerifiedByAdmin: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
