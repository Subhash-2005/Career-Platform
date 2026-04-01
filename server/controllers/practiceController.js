const Groq = require("groq-sdk");
const Roadmap = require("../models/Roadmap");
const User = require("../models/User"); // Added to get the user's career role
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.generateDailyPractice = async (req, res) => {
  try {
    const userId = req.user;

    // 1. Get User Profile and Roadmap
    const [user, roadmap] = await Promise.all([
      User.findById(userId),
      Roadmap.findOne({ userId })
    ]);

    if (!user || !roadmap) {
      return res.status(404).json({ message: "User profile or Roadmap not found" });
    }

    const targetRole = user.targetRole || "Professional";

    // 2. Identify the active topic from the Roadmap
    const currentDay = roadmap.roadmapDays.find(d => d.status !== "completed") || roadmap.roadmapDays[0];
    const topic = currentDay.tasks[0]?.topic || "Core Industry Concepts";

    // 3. Dynamic Prompt Generation
    // This tells the AI to be an expert in the user's specific role
    const completion = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: `You are a world-class expert examiner for the role of ${targetRole}. Your task is to test the user's knowledge on a specific topic within their career path. Output ONLY a valid JSON object.` 
        },
        { 
          role: "user", 
          content: `Generate 15 high-quality MCQs for a ${targetRole} student learning about "${topic}". 
          
          Requirements:
          1. ALL questions must be strictly related to the topic: "${topic}".
          2. For Technical/Coding roles: Include 5 questions with code snippets or debugging logic.
          3. For Non-Technical roles (e.g., Chef, Designer): Include 5 questions about specific tools, processes, or "on-the-job" technical standards for "${topic}".
          4. Difficulty Distribution: 5 Easy, 5 Medium, 5 Hard.
          5. Format: Return a JSON array named "questions". 
             Structure: [{"question": "...", "options": ["", "", "", ""], "answer": "correct option string", "explanation": "...", "difficulty": "...", "topic": "${topic}"}]` 
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    // 4. Parse and Clean Response
    const content = completion.choices[0].message.content;
    const parsedData = JSON.parse(content);
    const questions = parsedData.questions || parsedData;

    res.json({ 
      topic: topic, 
      role: targetRole,
      questions: Array.isArray(questions) ? questions : [] 
    });

  } catch (err) {
    console.error("Groq Practice Generation Error:", err);
    res.status(500).json({ message: "Failed to generate dynamic practice questions" });
  }
};