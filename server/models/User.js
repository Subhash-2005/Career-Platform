const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  // Profile info (filled after signup)
  age: Number,
  educationLevel: {
  type: String,
  enum: ["school", "college", "professional"]
},

schoolClass: {
  type: Number,
  min: 5,
  max: 12
},
  targetRole: String,
  hoursPerDay: Number,
  daysToCrack: Number,
  schoolPath: {
  type: String,
  default: null
  },
  foundationCompleted: {
  type: Boolean,
  default: false
  },
  role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  
});

module.exports = mongoose.model("User", UserSchema);
