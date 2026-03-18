const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  startMockInterview,
  submitMockInterview
} = require("../controllers/mockInterviewController");

const router = express.Router();

router.get("/start", auth, startMockInterview);
router.post("/submit", auth, submitMockInterview);

module.exports = router;
