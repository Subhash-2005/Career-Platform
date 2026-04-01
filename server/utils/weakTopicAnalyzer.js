const Attempt = require("../models/Attempt");

/**
 * Analyzes recent attempts to identify areas where the user is struggling.
 * Logic: Prioritizes topics with low accuracy OR high "low confidence" rates.
 */
async function getWeakTopics(userId) {
  try {
    // 1. Fetch the last 50 attempts to keep the data "fresh"
    const attempts = await Attempt.find({ userId })
      .sort({ createdAt: -1 }) // Using createdAt as defined in your model
      .limit(50);

    if (!attempts || attempts.length === 0) return [];

    const stats = {};

    // 2. Aggregate data by topic
    attempts.forEach((a) => {
      // Standardize topic name to avoid casing issues
      const topicKey = a.topic.trim();

      if (!stats[topicKey]) {
        stats[topicKey] = {
          total: 0,
          correct: 0,
          lowConfidenceFailures: 0,
        };
      }

      stats[topicKey].total++;

      if (a.correct) {
        stats[topicKey].correct++;
      } else {
        // Specifically track if they failed AND had low confidence
        if (a.confidence === "low") {
          stats[topicKey].lowConfidenceFailures++;
        }
      }
    });

    const weakTopics = [];

    // 3. Evaluate each topic
    Object.keys(stats).forEach((topic) => {
      const topicData = stats[topic];

      // Requirement: At least 2 attempts to consider it a pattern
      if (topicData.total < 2) return;

      const accuracy = (topicData.correct / topicData.total) * 100;
      const lowConfRate = (topicData.lowConfidenceFailures / topicData.total) * 100;

      /**
       * CRITERIA FOR WEAKNESS:
       * - Accuracy is below 65% (Struggling with the concept)
       * - OR Low Confidence Failures are > 30% (User feels lost)
       */
      if (accuracy < 65 || lowConfRate > 30) {
        weakTopics.push({
          name: topic,
          priority: 100 - accuracy + lowConfRate // Higher priority for lower accuracy
        });
      }
    });

    // 4. Sort by priority and return top 5 strings
    return weakTopics
      .sort((a, b) => b.priority - a.priority)
      .map(t => t.name)
      .slice(0, 5);

  } catch (err) {
    console.error("Weak Topic Analyzer Error:", err);
    return [];
  }
}

module.exports = getWeakTopics;