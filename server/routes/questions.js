const express = require("express");
const {
  getQuestions,
  submitAttempt
} = require("../controllers/questionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getQuestions);
router.post("/attempt", authMiddleware, submitAttempt);

module.exports = router;
