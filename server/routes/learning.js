const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getTopicContent } = require("../controllers/learningController");

const router = express.Router();

router.get("/:role/:topic/:level", authMiddleware, getTopicContent);

module.exports = router;