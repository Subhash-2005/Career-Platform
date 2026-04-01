const express = require("express");
const {
  generateRoadmap,
  getRoadmap,
  getRoadmapProgress,
  getTodayTopic,
  completeDay,
  completeTask,
  followRoadmap // Add this to your controller exports!
} = require("../controllers/roadmapController");
const authMiddleware = require("../middleware/authMiddleware");

// CRITICAL: You must import the Roadmap model to use it in the community route
const Roadmap = require("../models/Roadmap");

const router = express.Router();

// Existing Routes
router.post("/generate", authMiddleware, generateRoadmap);
router.get("/", authMiddleware, getRoadmap);
router.get("/progress", authMiddleware, getRoadmapProgress);
router.get("/today", authMiddleware, getTodayTopic);
router.post("/complete-day", authMiddleware, completeDay);
router.post("/complete-task", authMiddleware, completeTask);

// NEW: Follow another user's roadmap
// Ensure you add 'followRoadmap' function to your roadmapController.js
router.post("/follow", authMiddleware, followRoadmap);

// GET /api/roadmap/community?role=Chef
// GET /api/roadmap/community?role=Chef
router.get("/community", authMiddleware, async (req, res) => {
  try {
    let { role } = req.query;

    if (!role || role === "undefined" || role === "") {
      return res.json([]);
    }

    // 1. IMPROVED: Clean the string and use a simple case-insensitive search
    const cleanRole = role.trim();
    // This looks for the string anywhere in the careerPath
    const roleRegex = new RegExp(cleanRole, "i"); 

    // 2. Find roadmaps excluding the current logged-in user
    const otherRoadmaps = await Roadmap.find({
      careerPath: { $regex: roleRegex }, // Explicit regex check
      userId: { $ne: req.user } 
    })
    .populate("userId", "name educationLevel")
    .limit(10);

    // ... inside your /community route ...

const results = otherRoadmaps.map(rm => ({
  roadmapId: rm._id,
  userName: rm.userId?.name || "Anonymous",
  level: rm.userId?.educationLevel || "N/A",
  
  // 1. Keep the number
  totalWeeks: rm.roadmapDays.length, 
  
  // 2. ADD THIS LINE: Send the label of the first entry (e.g., "Week 1" or "Day 1")
  // This allows the Dashboard to detect the correct unit automatically.
  firstDayLabel: rm.roadmapDays[0]?.label || "", 
  
  role: rm.careerPath
}));

res.json(results);

  } catch (err) {
    console.error("Community fetch error:", err);
    res.status(500).json({ message: "Failed to fetch community roadmaps" });
  }
});
// GET /api/roadmap/view/:id
router.get("/view/:id", authMiddleware, async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id).populate("userId", "name");
    if (!roadmap) return res.status(404).json({ message: "Not found" });
    res.json(roadmap);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;