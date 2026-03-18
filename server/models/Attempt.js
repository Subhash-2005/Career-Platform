const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"]
  },
  correct: {
    type: Boolean,
    required: true
  },
  confidence: {
    type: String,
    enum: ["low", "medium", "high"]
  },
  link: {                 // ← ADD THIS
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Attempt", attemptSchema);
