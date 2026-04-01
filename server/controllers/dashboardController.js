const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const MockInterview = require("../models/MockInterview");
const User = require("../models/User");
const Roadmap = require("../models/Roadmap"); // ADDED: Required to check roadmap labels
const getWeakTopics = require("../utils/weakTopicAnalyzer");
const PROBLEM_BANK = require("../data/problemBank");

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 1. FETCH CURRENT ROADMAP TO DETERMINE UNIT
    const currentRoadmap = await Roadmap.findOne({ userId });
    
    let unitType = "Days"; 
    let totalDuration = 0;

    if (currentRoadmap && currentRoadmap.roadmapDays.length > 0) {
      totalDuration = currentRoadmap.roadmapDays.length;
      // Check if the first label contains "Week"
      if (currentRoadmap.roadmapDays[0].label?.includes("Week")) {
        unitType = "Weeks";
      }
    }

    const totalQuestions = await Question.countDocuments();
    const attempts = await Attempt.find({ userId });
    const latestInterview = await MockInterview.findOne({ userId }).sort({ createdAt: -1 });

    const attempted = attempts.length;
    const solved = attempts.filter(a => a.correct).length;
    const weakTopics = await getWeakTopics(userId);

    const accuracy = attempted ? solved / attempted : 0;
    const topicsAttempted = [...new Set(attempts.map(a => a.topic))];
    const totalTopics = Object.keys(PROBLEM_BANK).length;
    const topicCoverage = totalTopics > 0 ? topicsAttempted.length / totalTopics : 0;

    let difficultyScore = 0;
    attempts.forEach(a => {
      if (!a.correct) return;
      if (a.difficulty === "easy") difficultyScore += 1;
      else if (a.difficulty === "medium") difficultyScore += 2;
      else if (a.difficulty === "hard") difficultyScore += 3;
    });
    difficultyScore = attempts.length > 0 ? difficultyScore / (attempts.length * 3) : 0;

    const practiceReadiness = Math.round(accuracy * 50 + topicCoverage * 30 + difficultyScore * 20);
    const interviewScore = latestInterview ? latestInterview.totalScore : 0;
    let finalReadiness = latestInterview ? Math.round((practiceReadiness * 0.7) + (interviewScore * 0.3)) : practiceReadiness;

    res.json({
      totalQuestions,
      attempted,
      solved,
      readinessScore: Math.min(100, finalReadiness),
      latestInterviewScore: interviewScore,
      weakAreas: weakTopics,
      targetRole: user.targetRole,
      unitType: unitType, 
      daysToCrack: totalDuration 
    });

  } catch (err) {
    console.error("DASHBOARD STATS ERROR:", err);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};