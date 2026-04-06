const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  getNextQuestion,
  submitAnswer,
  generateFinalAnalysis
} = require("../controllers/mockInterviewController");

const router = express.Router();

// 1. Get the next dynamic AI question
router.get("/next-question", auth, getNextQuestion);

// 2. Submit a single answer for AI analysis
router.post("/submit-answer", auth, submitAnswer);

// 3. Finalize the interview and get the Performance Report
router.get("/final-analysis", auth, generateFinalAnalysis);

module.exports = router;