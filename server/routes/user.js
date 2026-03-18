const express = require("express");
const {
  updateProfile,
  getProfile,
  saveSchoolPath
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/profile", authMiddleware, updateProfile);
router.get("/profile", authMiddleware, getProfile);
router.post("/school-path", authMiddleware, saveSchoolPath);

module.exports = router;
