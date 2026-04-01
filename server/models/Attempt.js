// models/Attempt.js
const mongoose = require("mongoose");
const AttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
  correct: { type: Boolean, required: true },
  confidence: { type: String, enum: ["low", "medium", "high"] },
  // CHANGE THIS: Remove any 'match' or 'validate' properties
  link: { 
    type: String, 
    required: false, // Make it optional
    default: "" 
  },
  questionId: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Attempt", AttemptSchema);