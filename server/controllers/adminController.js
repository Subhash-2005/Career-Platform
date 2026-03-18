const User = require("../models/User");
const Attempt = require("../models/Attempt");
const getWeakTopics = require("../utils/weakTopicAnalyzer");

exports.getAdminAnalytics = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments({ role: "user" });

    const users = await User.find({ role: "user" });

    let totalReadiness = 0;
    let allWeakTopics = {};
    let topUsers = [];

    for (let user of users) {

      const weakTopics = await getWeakTopics(user._id);

      const penalty = weakTopics.length * 5;
      const readinessScore = Math.max(0, 100 - penalty);

      totalReadiness += readinessScore;

      // Track weak topic frequency
      weakTopics.forEach(topic => {
        if (!allWeakTopics[topic]) allWeakTopics[topic] = 0;
        allWeakTopics[topic]++;
      });

      topUsers.push({
        name: user.name,
        email: user.email,
        readinessScore
      });
    }

    const averageReadiness =
      totalUsers > 0
        ? (totalReadiness / totalUsers).toFixed(1)
        : 0;

    topUsers.sort((a, b) => b.readinessScore - a.readinessScore);

    const mostCommonWeakTopics = Object.entries(allWeakTopics)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    res.json({
      totalUsers,
      averageReadiness,
      topUsers: topUsers.slice(0, 5),
      mostCommonWeakTopics
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Admin analytics failed" });
  }
};