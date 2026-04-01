const Roadmap = require("../models/Roadmap");
const User = require("../models/User");
const Attempt = require("../models/Attempt");
const MockInterview = require("../models/MockInterview");
const getWeakTopics = require("../utils/weakTopicAnalyzer");
const PROBLEM_BANK = require("../data/problemBank");
const getAdaptivePractice = require("../utils/adaptivePracticeSelector");
const Groq = require("groq-sdk");

// Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ====================== GENERATE ROADMAP (AI POWERED) ======================
exports.generateRoadmap = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clear old data to start fresh for the new AI roadmap
    await Attempt.deleteMany({ userId: req.user });
    await MockInterview.deleteMany({ userId: req.user });
    await Roadmap.deleteMany({ userId: req.user });

    // 1. Determine the structure based on duration
    const isLongTerm = user.daysToCrack >= 30;
    const timeLabel = isLongTerm ? "WEEKLY PHASES" : "DAILY STEPS";

    // 2. Build the AI Prompt
    // This follows the "No Spoon-feeding" guide: focus on curriculum and objectives.
    // const prompt = `
    //   Generate a professional ${user.daysToCrack}-day learning roadmap for a ${user.educationLevel} student 
    //   aiming to become a ${user.targetRole}. 
      
    //   Format rules:
    //   - Organize by ${timeLabel}.
    //   - For each ${isLongTerm ? 'Week' : 'Day'}, provide a clear 'topic'.
    //   - Provide a specific practical 'task' (e.g., project, lab, or exercise).
    //   - Provide exactly 3 'concepts' (key technical milestones to master).
    //   - STRICT: DO NOT provide any website links, YouTube URLs, or external resources.
      
    //   Return ONLY a JSON object with a key 'roadmap' containing a list.
    //   Each item format: {"period": "Week 1/Day 1", "topic": "string", "task": "string", "concepts": ["a", "b", "c"]}
    // `;
    // const prompt = `
    //   Generate a professional ${user.daysToCrack}-day learning curriculum for a ${user.educationLevel} 
    //   aiming to become a ${user.targetRole}. 
      
    //   Formatting & Content Rules:
    //   1. Organize the curriculum by ${timeLabel}.
      
    //   2. For 'topic': Provide a clear, professional title for this phase.
      
    //   3. For 'task': Provide a COMPREHENSIVE EXECUTION GUIDE (40-60 words). 
    //      Do not just give a title. Explain the specific steps the student must take, 
    //      what they should produce (e.g., a report, a spreadsheet, a code module, or a case study), 
    //      and how this activity prepares them for a real-world ${user.targetRole} role.
      
    //   4. For 'concepts': Provide exactly 3 'Core Pillars of Mastery' (the essential domain knowledge 
    //      required to successfully complete this phase's task).
      
    //   5. STRICT: DO NOT provide any website links, YouTube URLs, or external resources. 
    //      The student must research the 'How-To' themselves.
      
    //   Return ONLY a JSON object with a key 'roadmap' containing a list of objects.
    //   Format: {"period": "...", "topic": "...", "task": "...", "concepts": ["...", "...", "..."]}
    // `;
    const prompt = `
      Generate a professional ${user.daysToCrack}-day learning curriculum for a ${user.educationLevel} 
      aiming to become a ${user.targetRole}. 
      
      Formatting & Content Rules:
      1. Organization: Organize the curriculum by ${timeLabel}.
      
      2. For 'period' (CRITICAL): 
         - If the total days (${user.daysToCrack}) is 30 or more: 
           You MUST generate exactly ONE object for every 7-day block.
           Label format: "Week X (Days Y-Z)". 
           Example: "Week 1 (Days 1-7)", "Week 2 (Days 8-14)", "Week 3 (Days 15-21)".
         - If the total days is less than 30:
           Label format: "Day X".
      
      3. For 'topic': Provide a clear, professional title for this specific unit.
      
      4. For 'task': Provide a COMPREHENSIVE EXECUTION GUIDE (40-60 words). 
         Do not just give a title. Explain the specific steps the student must take, 
         what they should produce (e.g., a report, a spreadsheet, a code module, or a case study), 
         and how this activity prepares them for a real-world ${user.targetRole} role.
      
      5. For 'concepts': Provide exactly 3 'Core Pillars of Mastery' (domain knowledge required for this unit).
      
      6. STRICT: DO NOT provide any website links, YouTube URLs, or external resources. 
      7. OUTPUT: Return ONLY a JSON object with a key 'roadmap' containing a list of objects.
      
      Format: {"period": "Week 1 (Days 1-7)", "topic": "...", "task": "...", "concepts": ["...", "...", "..."]}
    `;

    // 3. Call Groq AI
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);

    // 4. Transform AI data into your existing MongoDB Schema format
    const roadmapDays = aiResponse.roadmap.map((item, index) => ({
  day: index + 1,
  label: item.period,
  tasks: [
    {
      topic: item.topic,
      note: item.task, // The AI's assignment
      concepts: item.concepts, // The AI's 3-4 mastery goals
      type: "learning",
      completed: false
    }
  ],
  status: "pending"
}));

    // 5. Create the Roadmap in Database
    const roadmap = await Roadmap.create({
      userId: req.user,
      userMode: user.educationLevel,
      careerPath: user.targetRole,
      roadmapDays
    });

    return res.json({
      mode: "roadmap",
      roadmap
    });

  } catch (err) {
    console.error("AI Roadmap Generation Error:", err);
    res.status(500).json({ message: "Roadmap generation failed. Ensure GROQ_API_KEY is set." });
  }
};

// ====================== COMPLETE TASK ======================
exports.completeTask = async (req, res) => {
  try {
    const { day, taskIndex } = req.body;

    const roadmap = await Roadmap.findOne({ userId: req.user });

    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    const dayIndex = roadmap.roadmapDays.findIndex(d => d.day === day);

    if (dayIndex === -1) {
      return res.status(404).json({ message: "Day not found" });
    }

    const taskPath = `roadmapDays.${dayIndex}.tasks.${taskIndex}.completed`;

    // update task completion atomically
    await Roadmap.updateOne(
      { userId: req.user },
      { $set: { [taskPath]: true } }
    );

    // check if all tasks are done
    const updatedRoadmap = await Roadmap.findOne({ userId: req.user });
    const updatedDay = updatedRoadmap.roadmapDays[dayIndex];
    const allCompleted = updatedDay.tasks.every(t => t.completed);

    if (allCompleted) {
      await Roadmap.updateOne(
        { userId: req.user },
        { $set: { [`roadmapDays.${dayIndex}.status`]: "completed" } }
      );
    }

    res.json({ message: "Task completed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Task completion failed" });
  }
};

// ====================== GET ROADMAP ======================
exports.getRoadmap = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const roadmap = await Roadmap.findOne({ userId: req.user });
    
    // If roadmap doesn't exist, we return a 200 with null to let frontend handle "Not Generated" state
    return res.json({ 
      mode: user.educationLevel === "school" ? "foundation" : "roadmap", 
      roadmap 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ====================== ROADMAP PROGRESS ======================
exports.getRoadmapProgress = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ userId: req.user });

    if (!roadmap || !roadmap.roadmapDays.length) {
      return res.json({
        totalDays: 0,
        completedDays: 0,
        progressPercent: 0
      });
    }

    const totalDays = roadmap.roadmapDays.length;
    const completedDays = roadmap.roadmapDays.filter(
      d => d.status === "completed"
    ).length;

    res.json({
      totalDays,
      completedDays,
      progressPercent: Math.round((completedDays / totalDays) * 100)
    });

  } catch (err) {
    res.status(500).json({ message: "Progress fetch failed" });
  }
};

// ====================== COMPLETE DAY ======================
exports.completeDay = async (req, res) => {
  try {
    const { day } = req.body;
    const roadmap = await Roadmap.findOne({ userId: req.user });

    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    const targetDay = roadmap.roadmapDays.find(d => d.day === day);

    if (!targetDay) {
      return res.status(404).json({ message: "Day not found" });
    }

    targetDay.status = "completed";
    // Also mark all tasks in that day as completed
    targetDay.tasks.forEach(t => t.completed = true);

    await roadmap.save();
    res.json({ message: `Day ${day} marked as completed` });

  } catch (err) {
    res.status(500).json({ message: "Failed to complete day" });
  }
};

// ====================== ADAPTIVE PRACTICE ======================
exports.getPracticeForToday = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ userId: req.user });

    if (!roadmap || !roadmap.roadmapDays.length) {
      return res.json({ questions: [] });
    }

    // find first pending roadmap day
    const today = roadmap.roadmapDays.find(d => d.status === "pending");

    if (!today) {
      return res.json({ questions: [] });
    }

    const topics = today.tasks.map(t => t.topic).filter(Boolean);

    if (!topics.length) {
      return res.json({ questions: [] });
    }

    const weakTopics = await getWeakTopics(req.user);
    let weightedTopics = [];

    topics.forEach(topic => {
      if (weakTopics.includes(topic)) {
        weightedTopics.push(topic, topic, topic);
      } else {
        weightedTopics.push(topic);
      }
    });

    const topicName = weightedTopics[Math.floor(Math.random() * weightedTopics.length)];
    const attempts = await Attempt.find({ userId: req.user });

    const problems = await getAdaptivePractice(
      topicName,
      attempts,
      PROBLEM_BANK
    );

    const shuffled = problems.sort(() => 0.5 - Math.random());
    const selectedProblems = shuffled.slice(0, 3).map(p => ({
      ...p,
      topic: topicName
    }));

    res.json({
      topic: topicName,
      questions: selectedProblems
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Practice load failed" });
  }
};

// ====================== TODAY TOPIC ======================
exports.getTodayTopic = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ userId: req.user });

    if (!roadmap || !roadmap.roadmapDays.length) {
      return res.json({ message: "Roadmap not generated yet" });
    }

    const today = roadmap.roadmapDays.find(d => d.status === "pending");

    if (!today) {
      return res.json({ message: "All tasks completed" });
    }

    res.json(today);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch today's tasks" });
  }
};
exports.followRoadmap = async (req, res) => {
  try {
    const { targetRoadmapId } = req.body;
    
    const sourceRoadmap = await Roadmap.findById(targetRoadmapId);
    if (!sourceRoadmap) return res.status(404).json({ message: "Roadmap not found" });

    // Delete your current plan
    await Roadmap.deleteMany({ userId: req.user });

    // Create a new one for you using THEIR steps
    const newRoadmap = await Roadmap.create({
      userId: req.user,
      careerPath: sourceRoadmap.careerPath,
      userMode: sourceRoadmap.userMode,
      roadmapDays: sourceRoadmap.roadmapDays.map(day => ({
        ...day.toObject(),
        status: "pending", // Reset progress for the new user
        tasks: day.tasks.map(t => ({ ...t.toObject(), completed: false }))
      }))
    });

    res.json({ message: "You are now following this roadmap!", roadmap: newRoadmap });
  } catch (err) {
    res.status(500).json({ message: "Follow action failed" });
  }
};