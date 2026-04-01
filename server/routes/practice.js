const express = require("express");
const router = express.Router();
const { generateDailyPractice } = require("../controllers/practiceController");
const authMiddleware = require("../middleware/authMiddleware");

// Ensure this line exists!
router.get("/generate", authMiddleware, generateDailyPractice);

module.exports = router;