const Attempt = require("../models/Attempt");

// ================= SUBMIT ATTEMPT =================
exports.submitAttempt = async (req, res) => {
  try {
    const { topic, difficulty, correct, confidence, link, questionId } = req.body;

    /**
     * FIX: We now allow attempts WITHOUT a link if they have a questionId.
     * This supports AI-generated questions.
     */
    const identifier = questionId || link;

    if (!identifier) {
      return res.status(400).json({ message: "Invalid problem identifier (link or questionId required)" });
    }

    // 🔹 Prevent duplicate attempts using whichever identifier exists
    const query = questionId ? { userId: req.user, questionId } : { userId: req.user, link };
    
    const exists = await Attempt.findOne(query);

    if (exists) {
      // If it's already solved, we just return success without creating a duplicate row
      return res.json({ message: "Already attempted" });
    }

    // Create the record
    await Attempt.create({
      userId: req.user,
      topic: topic || "Unknown",
      difficulty: (difficulty || "medium").toLowerCase(),
      correct: !!correct,
      confidence: confidence || "medium",
      link: link || "", // Make link optional
      questionId: questionId || "" // Store the AI question ID
    });

    res.json({ message: "Attempt recorded" });

  } catch (err) {
    console.error("Attempt save error:", err);
    res.status(500).json({ message: "Failed to record attempt" });
  }
};

// ================= GET ALL ATTEMPTS =================
// Updated to return both links and questionIds so the frontend can "check off" solved tasks
exports.getAllAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find(
      { userId: req.user },
      { link: 1, questionId: 1, _id: 0 }
    );
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all attempts" });
  }
};

// ================= GET TOPIC STATS =================
exports.getTopicStats = async (req, res) => {
  try {
    const attempts = await Attempt.find({ userId: req.user });

    const stats = {};

    attempts.forEach(a => {
      // Standardize topic name to ensure stats group correctly
      const topicName = a.topic || "General";
      
      if (!stats[topicName]) {
        stats[topicName] = {
          total: 0,
          correct: 0
        };
      }

      stats[topicName].total++;
      if (a.correct) stats[topicName].correct++;
    });

    const result = Object.keys(stats).map(topic => ({
      topic,
      accuracy: Math.round(
        (stats[topic].correct / stats[topic].total) * 100
      ) || 0, // Fallback to 0 if no attempts
      attempts: stats[topic].total
    }));

    res.json(result);

  } catch (err) {
    console.error("Stats fetch error:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};