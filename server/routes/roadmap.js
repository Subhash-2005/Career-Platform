const express = require("express");
const {
  generateRoadmap,
  getRoadmap,
  getRoadmapProgress,
  getTodayTopic,
  completeDay,
  completeTask
} = require("../controllers/roadmapController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", authMiddleware, generateRoadmap);
router.get("/", authMiddleware, getRoadmap);
// router.post("/complete-day", authMiddleware, completeDay);
router.get("/progress", authMiddleware, getRoadmapProgress);
router.get("/today", authMiddleware, getTodayTopic);
router.post("/complete-day", authMiddleware, completeDay);
router.post("/complete-task",authMiddleware, completeTask);
module.exports = router;
