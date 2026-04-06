const MockInterview = require("../models/MockInterview");
const User = require("../models/User");
const Roadmap = require("../models/Roadmap");
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ====================== 1. GET NEXT QUESTION ======================
exports.getNextQuestion = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const roadmap = await Roadmap.findOne({ userId: req.user });
    const currentTopic = roadmap?.roadmapDays.find(d => d.status === "pending")?.tasks[0]?.topic || "Fundamentals";

    let interview = await MockInterview.findOne({ userId: req.user, status: "in-progress" });
    if (!interview) {
      interview = await MockInterview.create({ userId: req.user, targetRole: user.targetRole });
    }

    const stepNumber = interview.chatHistory.length + 1;
    if (stepNumber > 10) return res.json({ status: "completed" });

    const isTechnical = stepNumber <= 5;
    
    // Create a VERY clear list of what was already asked
    const forbiddenTopics = interview.chatHistory.map(h => h.question).join(" | ");

    const prompt = `
      Act as a Lead Interviewer for ${user.targetRole}. 
      Topic: ${currentTopic}. 
      Question ${stepNumber}/10.

      CRITICAL - ALREADY ASKED (DO NOT REPEAT OR USE THESE THEMES):
      [${forbiddenTopics}]

      STRICT RULES:
      1. If Step ${stepNumber} is Technical (1-5): Pick a NEW sub-concept of "${currentTopic}" that is NOT in the forbidden list. 
         - If you already asked about "Loops", you MUST ask about "Data Types" or "Memory" or "Functions".
         - Be extremely specific. Instead of "What is a loop?", ask "How do you break out of a nested loop in a professional scenario?"
      2. If Step ${stepNumber} is Behavioral (6-10): Ask about workplace ethics or teamwork related to ${user.targetRole}.
      3. Never repeat the same logic or sentence structure as previous questions.

      Return ONLY JSON: {"question": "...", "category": "...", "tip": "..."}
    `;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.8, // Increased randomness
    });

    const aiQ = JSON.parse(completion.choices[0].message.content);

    res.json({
      status: "in-progress",
      question: aiQ.question,
      category: aiQ.category,
      tip: aiQ.tip,
      step: stepNumber
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

// ====================== 2. SUBMIT ANSWER ======================
exports.submitAnswer = async (req, res) => {
  try {
    const { answer } = req.body;
    const interview = await MockInterview.findOne({ userId: req.user, status: "in-progress" });

    // We still score it in the background so the final report is ready instantly
    const prompt = `Score this answer (0-100) and give 1-sentence internal feedback for the final report. Answer: "${answer}". Return JSON: {"score": 85, "feedback": "..."}`;
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const evaluation = JSON.parse(completion.choices[0].message.content);

    interview.chatHistory.push({
      step: interview.chatHistory.length + 1,
      userAnswer: answer,
      score: evaluation.score,
      feedback: evaluation.feedback, // Saved for the final report
      category: "technical"
    });

    await interview.save();
    
    // Just send a success message, no feedback text for the UI
    res.json({ success: true, message: "Answer recorded" });
  } catch (error) {
    res.status(500).json({ message: "Analysis failed" });
  }
};

// ====================== 3. FINAL ANALYSIS ======================
exports.generateFinalAnalysis = async (req, res) => {
  try {
    const interview = await MockInterview.findOne({ userId: req.user, status: "in-progress" });
    if (!interview) return res.status(404).json({ message: "Interview not found" });

    const transcript = interview.chatHistory.map(h => `Step ${h.step}: ${h.userAnswer}`).join("\n\n");

    const prompt = `
      Perform a final assessment for this ${interview.targetRole} interview:
      ${transcript}
      
      1. Overall Score (Average 0-100).
      2. Strengths: 2 professional/technical strengths.
      3. Weaknesses: 2 areas needing more study.
      4. Mentor Tips: Provide a friendly 2-sentence tip focusing on ${interview.targetRole} industry standards.

      Return ONLY a JSON object: {"totalScore": 75, "strengths": [], "weaknesses": [], "mentorTips": "..."}
    `;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content);
    
    // Update the record and close the session
    Object.assign(interview, result, { status: "completed" });
    await interview.save();

    res.json({ analysis: interview });
  } catch (error) {
    console.error("FINAL ANALYSIS ERROR:", error);
    res.status(500).json({ message: "Report generation failed" });
  }
};