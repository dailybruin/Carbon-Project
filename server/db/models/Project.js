const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: { type: String },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    status: { type: String, default: "Draft" },
    isApproved: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, strict: false }
);

let Project = mongoose.model("Project", projectSchema);

module.exports = Project;
