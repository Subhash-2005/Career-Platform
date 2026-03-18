const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

  topic: String,
  level: String,

  type: {
    type: String,
    enum: ["learning", "practice"]
  },

  completed: {
    type: Boolean,
    default: false
  }

}, { _id: false });

const RoadmapDaySchema = new mongoose.Schema({

  day: Number,
  label: String,

  tasks: [TaskSchema],

  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  }

}, { _id: false });

const RoadmapSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  userMode: String,
  careerPath: String,

  roadmapDays: [RoadmapDaySchema]

}, { timestamps: true });

module.exports = mongoose.model("Roadmap", RoadmapSchema);