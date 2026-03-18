const Question = require("../models/Question");
const UserProgress = require("../models/UserProgress");

// Get questions (filtered)
exports.getQuestions = async (req, res) => {
  const { topic, difficulty } = req.query;

  try {
    const questions = await Question.find({
      topic,
      difficulty
    });

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Submit attempt
exports.submitAttempt = async (req, res) => {
  const { questionId, status } = req.body;
  const question = await Question.findById(questionId);
  if (!question) {
    return res.status(400).json({ message: "Invalid question ID" });
  }
  try {
    let progress = await UserProgress.findOne({
      userId: req.user,
      questionId
    });

    if (!progress) {
      progress = await UserProgress.create({
        userId: req.user,
        questionId,
        status
      });
    } else {
      progress.attempts += 1;
      progress.status = status;
      progress.lastAttemptAt = Date.now();
      await progress.save();
    }

    res.json({ message: "Progress updated", progress });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
