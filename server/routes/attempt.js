const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { submitAttempt, getTopicStats, getAllAttempts } = require("../controllers/attemptController");

const router = express.Router();

router.post("/submit", authMiddleware, submitAttempt);
router.get("/stats", authMiddleware, getTopicStats);
router.get("/all",authMiddleware,getAllAttempts);
module.exports = router;
