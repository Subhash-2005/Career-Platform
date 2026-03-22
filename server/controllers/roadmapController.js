const Roadmap = require("../models/Roadmap");
const User = require("../models/User");
const Question = require("../models/Question");
const SCHOOL_CAREER_PATHS = require("../data/schoolCareerPaths");
const SCHOOL_FOUNDATION = require("../data/schoolFoundation");
const SKILL_TREES = require("../data/skillTrees");
const getWeakTopics = require("../utils/weakTopicAnalyzer");
const PROBLEM_BANK = require("../data/problemBank");
const Attempt = require("../models/Attempt");
const MockInterview = require("../models/MockInterview");
const getAdaptivePractice = require("../utils/adaptivePracticeSelector");
// ====================== GENERATE ROADMAP ======================
exports.generateRoadmap = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clear old data to start fresh for the new role
    await Attempt.deleteMany({ userId: req.user });
    await MockInterview.deleteMany({ userId: req.user });
    await Roadmap.deleteMany({ userId: req.user });

    // ====================== SCHOOL USER ======================
    if (user.educationLevel === "school") {
      const rawRole = (user.targetRole || "").toLowerCase().trim();
      const engineerVariant = rawRole.replace("developer", "engineer");
      const developerVariant = rawRole.replace("engineer", "developer");

      const guidance =
        SCHOOL_CAREER_PATHS[rawRole] ||
        SCHOOL_CAREER_PATHS[engineerVariant] ||
        SCHOOL_CAREER_PATHS[developerVariant] ||
        {
          goal: user.targetRole,
          description: "Career guidance will be added soon.",
          paths: []
        };

      if (!user.schoolPath) {
        return res.json({ mode: "school", guidance });
      }


const classLevel = user.schoolClass || 8;

const topics = SCHOOL_FOUNDATION[classLevel] || SCHOOL_FOUNDATION[8];

let roadmapDays = [];
let day = 1;

// If a path is selected, add short path milestone tasks at the start.
const selectedPath = guidance.paths?.find(p => 
  p.title.toLowerCase().trim() === (user.schoolPath || "").toLowerCase().trim()
);
if (selectedPath) {
  selectedPath.steps.forEach((step, index) => {
    roadmapDays.push({
      day: day++,
      tasks: [
        {
          topic: step,
          type: "career-path",
          completed: false,
          note: `Path milestone ${index + 1} of ${selectedPath.steps.length}`
        }
      ],
      status: "pending"
    });
  });
}

topics.forEach(topic => {
  for (let i = 0; i < topic.days; i++) {
    roadmapDays.push({
      day: day++,
      tasks: [
        {
          topic: topic.topic,
          type: "learning",
          completed: false
        }
      ],
      status: "pending"
    });
  }
});

      const roadmap = await Roadmap.create({
        userId: req.user,
        userMode: "school",
        careerPath: user.schoolPath,
        roadmapDays
      });

      return res.json({ mode: "foundation", roadmap, guidance, currentPath: user.schoolPath });
    }

    // ====================== COLLEGE / JOB USER ======================

    const skillTree =
    SKILL_TREES[user.targetRole.toLowerCase()] ||
    SKILL_TREES["software engineer"];
    let topics = [];

    skillTree.sections.forEach(section => {
      section.skills.forEach(skill => {
        skill.levels.forEach(level => {
          topics.push({
            topic: skill.topic,
            level: level.name,
            // concept: level.concept,
            // example: level.example || "",
            // resources: level.resources || []
          });
        });
      });
    });
    const weakTopics = await getWeakTopics(req.user);

    // Boost weak topics by adding them again
    weakTopics.forEach(weak => {
    const match = topics.find(t => t.topic === weak);
    if (match) {
      topics.unshift(match); // push weak topic earlier
    }
    });


let roadmapDays = [];
let counter = 1;

const capacity = user.daysToCrack * user.hoursPerDay;

// Importance ranking
const importanceMap = {
  "Arrays": 10,
  "Strings": 10,
  "Linked List": 9,
  "Stack": 9,
  "Queue": 8,
  "Trees": 10,
  "Graphs": 9,
  "Dynamic Programming": 10,
  "Greedy": 8,
  "Backtracking": 8,
  "Operating Systems": 7,
  "DBMS": 7,
  "Computer Networks": 7,
  "System Design": 6
};

// Sort by importance
topics.sort((a, b) => {
  const impA = importanceMap[a.topic] || 5;
  const impB = importanceMap[b.topic] || 5;
  return impB - impA;
});

// Decide how many topics to include
let topicsToUse;

// distribute topics based on available time

const totalTopics = topics.length;

const maxTopicsPossible = user.daysToCrack * Math.max(1, user.hoursPerDay);

topicsToUse = topics.slice(0, Math.min(totalTopics, maxTopicsPossible));

if (user.daysToCrack <= 120) {

  let topicIndex = 0;

  for (let day = 1; day <= user.daysToCrack; day++) {

    let tasks = [];

    const topicsPerDay =
      user.hoursPerDay <= 1 ? 1 :
      user.hoursPerDay <= 3 ? 2 :
      3;

    // learning tasks
    for (let t = 0; t < topicsPerDay; t++) {
      
      if (topicIndex >= topicsToUse.length) break;

      const topic = topicsToUse[topicIndex];

      tasks.push({
        topic: topic.topic,
        level: topic.level,
        type: "learning",
        completed: false
      });

      topicIndex++;

    }

    // practice task
    // always add practice task
    const practiceTopic =
      tasks.find(t => t.type === "learning")?.topic ||
      topicsToUse[Math.floor(Math.random() * topicsToUse.length)].topic;

      tasks.push({
        topic: practiceTopic,
        type: "practice",
        completed: false
      });

    if (tasks.length > 0) {

      roadmapDays.push({
        day,
        tasks,
        status: "pending"
      });

    }

  }

}

// ====================== WEEKLY ROADMAP ======================

else if (user.daysToCrack <= 365) {

  const totalWeeks = Math.ceil(user.daysToCrack / 7);
  let topicIndex = 0;

  for (let i = 0; i < totalWeeks; i++) {

    let tasks = [];

    for (let t = 0; t < 5; t++) {

      const topic = topicsToUse[topicIndex % topicsToUse.length];

      tasks.push({
        topic: topic.topic,
        level: topic.level,
        type: "learning",
        completed: false
      });

      topicIndex++;

    }

    tasks.push({
      topic: tasks[0].topic,
      type: "practice",
      completed: false
    });

    roadmapDays.push({
      day: i + 1,
      label: `Week ${i + 1}`,
      tasks,
      status: "pending"
    });

  }

}

// ====================== MONTHLY ROADMAP ======================

else {

  const totalMonths = Math.ceil(user.daysToCrack / 30);
  let topicIndex = 0;

  for (let i = 0; i < totalMonths; i++) {

    let tasks = [];

    for (let t = 0; t < 8; t++) {

      const topic = topicsToUse[topicIndex % topicsToUse.length];

      tasks.push({
        topic: topic.topic,
        level: topic.level,
        type: "learning",
        completed: false
      });

      topicIndex++;

    }

    tasks.push({
      topic: tasks[0].topic,
      type: "practice",
      completed: false
    });

    roadmapDays.push({
      day: i + 1,
      label: `Month ${i + 1}`,
      tasks,
      status: "pending"
    });

  }

}
    const roadmap = await Roadmap.create({
      userId: req.user,
      userMode: "college",
      careerPath: user.targetRole,
      roadmapDays
    });

    return res.json({
      mode: "roadmap",
      roadmap
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Roadmap generation failed" });
  }
};

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

    if (user.educationLevel === "school") {
      const goalKey = (user.targetRole || "")
        .toLowerCase()
        .trim()
        .replace("developer", "engineer");

      const guidance =
        SCHOOL_CAREER_PATHS[goalKey] || {
          goal: user.targetRole,
          description: "Career guidance will be added soon.",
          paths: []
        };

      if (!user.schoolPath) {
        return res.json({ mode: "school", guidance });
      }

      const roadmap = await Roadmap.findOne({ userId: req.user });

      return res.json({ mode: "foundation", roadmap, guidance, currentPath: user.schoolPath });
    }

    const roadmap = await Roadmap.findOne({ userId: req.user });

    return res.json({ mode: "roadmap", roadmap });

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
      progressPercent: Math.round(
        (completedDays / totalDays) * 100
      )
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

    const targetDay = roadmap.roadmapDays.find(
      d => d.day === day
    );

    if (!targetDay) {
      return res.status(404).json({ message: "Day not found" });
    }

    targetDay.status = "completed";
    await roadmap.save();

    res.json({ message: `Day ${day} marked as completed` });

  } catch (err) {
    res.status(500).json({ message: "Failed to complete day" });
  }
};


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

    // ----------------------------
    // collect today's topics
    // ----------------------------
    const topics = today.tasks.map(t => t.topic).filter(Boolean);

    if (!topics.length) {
      return res.json({ questions: [] });
    }

    // ----------------------------
    // detect weak topics
    // ----------------------------
    const weakTopics = await getWeakTopics(req.user);

    // ----------------------------
    // build weighted topic list
    // weak topics appear 3x more
    // ----------------------------
    let weightedTopics = [];

    topics.forEach(topic => {

      if (weakTopics.includes(topic)) {

        weightedTopics.push(topic, topic, topic);

      } else {

        weightedTopics.push(topic);

      }

    });

    // ----------------------------
    // pick random topic
    // ----------------------------
    const topicName =
      weightedTopics[Math.floor(Math.random() * weightedTopics.length)];

    // ----------------------------
    // fetch problems from bank
    // ----------------------------
    const attempts = await Attempt.find({ userId: req.user });

const problems = await getAdaptivePractice(
  topicName,
  attempts,
  PROBLEM_BANK
);

    // return first 3 problems
    const shuffled = problems.sort(() => 0.5 - Math.random());
const selectedProblems = shuffled.slice(0, 3).map(p => ({
  ...p,
  topic: topicName
}));

    // ----------------------------
    // debug logs (remove later)
    // ----------------------------
    console.log("Today's topics:", topics);
    console.log("Weak topics:", weakTopics);
    console.log("Selected practice topic:", topicName);

    res.json({
      topic: topicName,
      questions: selectedProblems
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Practice load failed"
    });

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
