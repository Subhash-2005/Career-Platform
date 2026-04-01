const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },

  // Make these optional for the initial registration
  educationLevel: {
    type: String,
    enum: ["school", "college", "professional"],
    default: "college"
  },
  schoolClass: { type: Number, min: 5, max: 12 },
  
  // REMOVED 'required: true' here so Register doesn't crash
  targetRole: { type: String, default: "" }, 
  
  hoursPerDay: { type: Number, default: 0 },
  daysToCrack: { type: Number, default: 0 },
  
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

// Keep the compound index to prevent duplicate goal creation later
UserSchema.index({ email: 1, targetRole: 1 }, { unique: false }); 

module.exports = mongoose.model("User", UserSchema);