const mongoose = require("mongoose");
const Question = require("../models/Question");
require("dotenv").config();

const questions = [
  {
    role: "Software Engineer",
    topic: "Arrays",
    difficulty: "Easy",
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    constraints: "2 <= nums.length <= 10^4",
    sampleInput: "nums = [2,7,11,15], target = 9",
    sampleOutput: "[0,1]"
  },
  {
    role: "Software Engineer",
    topic: "Strings",
    difficulty: "Easy",
    title: "Valid Palindrome",
    description:
      "Check whether a string is a palindrome ignoring non-alphanumeric characters.",
    constraints: "1 <= s.length <= 10^5",
    sampleInput: "s = 'A man, a plan, a canal: Panama'",
    sampleOutput: "true"
  }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Question.insertMany(questions);
    console.log("Questions seeded successfully");
    process.exit();
  })
  .catch(err => console.error(err));
