const Question = require("../models/Question");
const MockInterview = require("../models/MockInterview");

exports.startMockInterview = async (req, res) => {
  const coding = await Question.find({ difficulty: "Easy" }).limit(2);
  const cs = await Question.find({ topic: "DBMS" }).limit(1);

  const hr = [
    {
      _id: null,
      title: "Tell me about yourself",
      category: "hr"
    }
  ];

  res.json({
    questions: [...coding, ...cs, ...hr]
  });
};

exports.submitMockInterview = async (req, res) => {
  try {
    const { answers } = req.body;

    // Validate input
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        message: "Invalid answers format. Expected non-empty array."
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }

    let totalScore = 0;
    let strengths = [];
    let weaknesses = [];

    answers.forEach(a => {
      if (a.userAnswer && a.userAnswer.trim().length > 30) {
        totalScore += 10;
        strengths.push(a.category);
      } else {
        weaknesses.push(a.category);
      }
    });

    // Remove duplicates
    strengths = [...new Set(strengths)];
    weaknesses = [...new Set(weaknesses)];

    const interview = await MockInterview.create({
      userId: req.user._id,
      questions: answers,
      totalScore,
      strengths,
      weaknesses
    });

    res.status(201).json({
      message: "Mock interview completed",
      interview
    });
  } catch (error) {
    console.error("Error submitting mock interview:", error);
    res.status(500).json({
      message: "Failed to submit mock interview",
      error: error.message
    });
  }
};
