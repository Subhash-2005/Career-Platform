const mongoose = require("mongoose");

const UserProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },

  status: {
    type: String,
    enum: ["attempted", "solved"],
    default: "attempted"
  },

  attempts: {
    type: Number,
    default: 1
  },

  lastAttemptAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("UserProgress", UserProgressSchema);
