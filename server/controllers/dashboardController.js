const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const MockInterview = require("../models/MockInterview");
const getWeakTopics = require("../utils/weakTopicAnalyzer");
const PROBLEM_BANK = require("../data/problemBank");

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user;

    const totalQuestions = await Question.countDocuments();
    const attempts = await Attempt.find({ userId });
    
    // Fetch latest mock interview
    const latestInterview = await MockInterview.findOne({ userId }).sort({ createdAt: -1 });

    const attempted = attempts.length;
    const solved = attempts.filter(a => a.correct).length;
    const weakTopics = await getWeakTopics(userId);

    // Accuracy
    const accuracy = attempted ? solved / attempted : 0;

    // Topic coverage
    const topicsAttempted = [...new Set(attempts.map(a => a.topic))];
    const totalTopics = Object.keys(PROBLEM_BANK).length;
    const topicCoverage = totalTopics > 0 ? topicsAttempted.length / totalTopics : 0;

    // Difficulty score
    let difficultyScore = 0;
    attempts.forEach(a => {
      if (!a.correct) return;
      if (a.difficulty === "easy") difficultyScore += 1;
      else if (a.difficulty === "medium") difficultyScore += 2;
      else if (a.difficulty === "hard") difficultyScore += 3;
    });

    difficultyScore = attempts.length > 0 ? difficultyScore / (attempts.length * 3) : 0;

    // Practice-based readiness (out of 100)
    const practiceReadiness = Math.round(
      accuracy * 50 +
      topicCoverage * 30 +
      difficultyScore * 20
    );

    // Mock Interview score (out of 100)
    const interviewScore = latestInterview ? latestInterview.totalScore : 0;

    // Final Weighted Readiness Score (70% Practice, 30% Interview)
    // If no interview taken, weight shifts towards practice or interview score stays 0
    let finalReadiness;
    if (latestInterview) {
      finalReadiness = Math.round((practiceReadiness * 0.7) + (interviewScore * 0.3));
    } else {
      finalReadiness = practiceReadiness; // Default to practice if no interview
    }

    res.json({
      totalQuestions,
      attempted,
      solved,
      readinessScore: Math.min(100, finalReadiness),
      latestInterviewScore: interviewScore,
      weakAreas: weakTopics
    });

  } catch (err) {
    console.error("DASHBOARD STATS ERROR:", err);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};