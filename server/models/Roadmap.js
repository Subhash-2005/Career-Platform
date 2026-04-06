const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  level: String, // e.g., Beginner, Intermediate
  note: String,  // We'll use this for the "Practical Task/Assignment"
  
  // NEW: Added to store the "Concepts to Master" from the AI
  concepts: [String], 

  type: {
    type: String,
    enum: ["learning", "practice", "career-path"],
    default: "learning"
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const RoadmapDaySchema = new mongoose.Schema({
  day: Number,
  label: String, // e.g., "Week 1", "Day 5"
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
  userMode: String, // school, college, or professional
  careerPath: String, // The Target Role
  aiMessage: String,
  careerPaths: [
    {
      title: String,
      stream: String,
      exams: [String],
      milestones: [String]
    }
  ],
  roadmapDays: [RoadmapDaySchema]
}, { timestamps: true });

module.exports = mongoose.model("Roadmap", RoadmapSchema);