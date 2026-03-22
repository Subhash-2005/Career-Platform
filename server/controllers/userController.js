const User = require("../models/User");

// Update / Create Profile
exports.updateProfile = async (req, res) => {
  const {
    educationLevel,
    schoolClass,
    targetRole,
    hoursPerDay,
    daysToCrack
  } = req.body;

  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.educationLevel = educationLevel;
    user.schoolClass = schoolClass;
    user.targetRole = targetRole;
    user.hoursPerDay = hoursPerDay;
    user.daysToCrack = daysToCrack;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      profile: {
        age,
        educationLevel,
        targetRole,
        hoursPerDay,
        daysToCrack
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.saveSchoolPath = async (req, res) => {
  try {
    const { selectedPath } = req.body;

    const user = await User.findById(req.user); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.schoolPath = selectedPath;
    await user.save();

    res.json({ message: "Path saved successfully" });

  } catch (err) {
    console.error("SAVE SCHOOL PATH ERROR:", err);
    res.status(500).json({ message: "Failed to save path" });
  }
};

