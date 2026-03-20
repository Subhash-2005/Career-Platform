const Question = require("../models/Question");
const MockInterview = require("../models/MockInterview");
const User = require("../models/User");
const INTERVIEW_QUESTIONS = require("../data/interviewQuestions");

exports.startMockInterview = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const role = (user?.targetRole || "").toLowerCase();
    
    let techCategory = "general";
    if (role.includes("frontend") || role.includes("react") || role.includes("ui") || role.includes("ux")) techCategory = "frontend";
    else if (role.includes("backend") || role.includes("node") || role.includes("java") || role.includes("python")) techCategory = "backend";
    else if (role.includes("machine") || role.includes("ml") || role.includes("data scientist")) techCategory = "ml";

    // Select 1 HR, 2 Technical, 1 Behavioral/General
    const hr = INTERVIEW_QUESTIONS.general.find(q => q.category === "hr") || INTERVIEW_QUESTIONS.general[0];
    const tech = INTERVIEW_QUESTIONS[techCategory].slice(0, 2);
    const gen = INTERVIEW_QUESTIONS.general.find(q => q.id === "gen_3") || INTERVIEW_QUESTIONS.general[1];

    const finalQuestions = [
      { id: hr.id, title: hr.question, category: "hr", tips: hr.tips, keywords: hr.keywords },
      ...tech.map(q => ({ id: q.id, title: q.question, category: "technical", tips: q.tips, keywords: q.keywords })),
      { id: gen.id, title: gen.question, category: "behavioral", tips: gen.tips, keywords: gen.keywords }
    ];

    res.json({ questions: finalQuestions });
  } catch (error) {
    res.status(500).json({ message: "Failed to start interview" });
  }
};

exports.submitMockInterview = async (req, res) => {
  try {
    const { answers } = req.body;
    const user = await User.findById(req.user._id);

    let totalScore = 0;
    let strengths = [];
    let weaknesses = [];

    const evaluatedAnswers = answers.map(ans => {
      let score = 0;
      const question = [...INTERVIEW_QUESTIONS.general, ...INTERVIEW_QUESTIONS.frontend, ...INTERVIEW_QUESTIONS.backend, ...INTERVIEW_QUESTIONS.ml]
        .find(q => q.id === ans.id);

      if (ans.userAnswer && ans.userAnswer.length > 10) {
        score = 40; // Base score for providing an answer

        // Keyword matching
        if (question && question.keywords) {
          const matchedKeywords = question.keywords.filter(kw => 
            ans.userAnswer.toLowerCase().includes(kw.toLowerCase())
          );
          score += (matchedKeywords.length / question.keywords.length) * 60;
        }
      }

      const roundedScore = Math.round(score);
      totalScore += roundedScore;

      if (roundedScore >= 70) strengths.push(ans.category || "technical");
      else if (roundedScore < 40) weaknesses.push(ans.category || "general");

      return { 
        questionId: ans.id,
        userAnswer: ans.userAnswer,
        category: ans.category,
        score: roundedScore 
      };
    });

    const finalScore = Math.round(totalScore / answers.length);

    const interview = await MockInterview.create({
      userId: req.user,
      questions: evaluatedAnswers,
      totalScore: finalScore,
      strengths: [...new Set(strengths)],
      weaknesses: [...new Set(weaknesses)]
    });

    res.status(201).json({
      message: "Mock interview completed",
      interview
    });
  } catch (error) {
    console.error("SUBMIT INTERVIEW ERROR:", error);
    res.status(500).json({ message: "Failed to process results" });
  }
};

