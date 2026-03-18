const Attempt = require("../models/Attempt");

// ================= SUBMIT ATTEMPT =================
exports.submitAttempt = async (req, res) => {
  try {

    const { topic, difficulty, correct, confidence, link } = req.body;

    // 🔹 Prevent duplicate attempts
    if (!link) {
      return res.status(400).json({ message: "Invalid problem link" });
    }
    const exists = await Attempt.findOne({
      userId: req.user,
      link
    });

    if (exists) {
      return res.json({ message: "Already attempted" });
    }

    await Attempt.create({
      userId: req.user,
      topic: topic || "Unknown",
      difficulty: (difficulty || "medium").toLowerCase(),
      correct: !!correct,
      confidence: confidence || "medium",
      link
    });

    res.json({ message: "Attempt recorded" });

  } catch (err) {
    console.error("Attempt save error:", err);
    res.status(500).json({ message: "Failed to record attempt" });
  }
};
// GET /attempt/all
exports.getAllAttempts = async (req, res) => {
  const attempts = await Attempt.find(
    { userId: req.user },
    { link: 1, _id: 0 }
  );

  res.json(attempts);
};

// ================= GET TOPIC STATS =================
exports.getTopicStats = async (req, res) => {
  try {
    const attempts = await Attempt.find({ userId: req.user });

    const stats = {};

    attempts.forEach(a => {
      if (!stats[a.topic]) {
        stats[a.topic] = {
          total: 0,
          correct: 0
        };
      }

      stats[a.topic].total++;
      if (a.correct) stats[a.topic].correct++;
    });

    const result = Object.keys(stats).map(topic => ({
      topic,
      accuracy: Math.round(
        (stats[topic].correct / stats[topic].total) * 100
      ),
      attempts: stats[topic].total
    }));

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
