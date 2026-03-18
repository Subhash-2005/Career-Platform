const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true
  },
  pattern: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["coding", "theory"],
    default: "coding"
  },
  solution: {
  type: String,
  required: true
  }
});

module.exports = mongoose.model("Question", questionSchema);
