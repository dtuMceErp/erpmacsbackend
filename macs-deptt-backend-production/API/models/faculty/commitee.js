const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const commiteeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  purpose: String,
  chairPerson: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Faculty" }],
  description: String,
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Commitee", commiteeSchema);
