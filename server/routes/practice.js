const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getPracticeForToday } = require("../controllers/roadmapController");

const router = express.Router();

router.get("/today", authMiddleware, getPracticeForToday);

module.exports = router;
