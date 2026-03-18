const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const getWeakTopics = require("../utils/weakTopicAnalyzer");
const PROBLEM_BANK = require("../data/problemBank");

exports.getDashboardStats = async (req, res) => {

  try {

    const userId = req.user;

    const totalQuestions = await Question.countDocuments();

    const attempts = await Attempt.find({ userId });

    const attempted = attempts.length;
    const solved = attempts.filter(a => a.correct).length;

    const weakTopics = await getWeakTopics(userId);

    // accuracy
    const accuracy = attempted ? solved / attempted : 0;

    // topic coverage
    const topicsAttempted = [...new Set(attempts.map(a => a.topic))];
    const totalTopics = Object.keys(PROBLEM_BANK).length;

    const topicCoverage =
      totalTopics > 0 ? topicsAttempted.length / totalTopics : 0;

    // difficulty score
    let difficultyScore = 0;

    attempts.forEach(a => {

      if (!a.correct) return;

      if (a.difficulty === "easy") difficultyScore += 1;
      else if (a.difficulty === "medium") difficultyScore += 2;
      else if (a.difficulty === "hard") difficultyScore += 3;

    });

    difficultyScore =
      attempts.length > 0
        ? difficultyScore / (attempts.length * 3)
        : 0;

    const readinessScore = Math.min(
      100,
      Math.round(
        accuracy * 50 +
        topicCoverage * 30 +
        difficultyScore * 20
      )
    );

    res.json({
      totalQuestions,
      attempted,
      solved,
      readinessScore,
      weakAreas: weakTopics
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Dashboard fetch failed" });

  }

};