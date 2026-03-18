const mongoose = require("mongoose");

const MockInterviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  questions: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
      },
      userAnswer: String,
      category: String, // coding / cs / hr
      score: Number
    }
  ],

  totalScore: Number,

  strengths: [String],
  weaknesses: [String],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("MockInterview", MockInterviewSchema);
