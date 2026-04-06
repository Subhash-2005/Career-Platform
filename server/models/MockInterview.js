const mongoose = require("mongoose");

const MockInterviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  targetRole: String,

  chatHistory: [
    {
      // NEW: Added 'step' to track Q1, Q2, etc. easily in the UI
      step: Number, 
      question: String,
      userAnswer: String,
      category: String,
      feedback: String,
      score: Number
    }
  ],

  status: {
    type: String,
    enum: ["in-progress", "completed"],
    default: "in-progress"
  },

  totalScore: Number,
  strengths: [String],
  weaknesses: [String],
  
  mentorTips: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
}); // Removed _id:false from sub-docs to allow easy updates if needed later

module.exports = mongoose.model("MockInterview", MockInterviewSchema);