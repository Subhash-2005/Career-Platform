const Attempt = require("../models/Attempt");

async function getWeakTopics(userId) {

  const attempts = await Attempt
    .find({ userId })
    .sort({ timestamp: -1 })
    .limit(50);

  const stats = {};

  attempts.forEach(a => {

    if (!stats[a.topic]) {
      stats[a.topic] = {
        total: 0,
        correct: 0,
        lowConfidence: 0
      };
    }

    stats[a.topic].total++;

    if (a.correct) stats[a.topic].correct++;

    if (!a.correct && a.confidence === "low") {
      stats[a.topic].lowConfidence++;
    }

  });

  const weakTopics = [];

  Object.keys(stats).forEach(topic => {

    if (stats[topic].total < 3) return;

    const accuracy =
      (stats[topic].correct / stats[topic].total) * 100;

    const lowConfRate =
      (stats[topic].lowConfidence / stats[topic].total) * 100;

    if (accuracy < 60 || lowConfRate > 40) {
      weakTopics.push(topic);
    }

  });

  return weakTopics;
}

module.exports = getWeakTopics;