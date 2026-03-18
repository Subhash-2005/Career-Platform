const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const roadmapRoutes = require("./routes/roadmap");
const questionRoutes = require("./routes/questions");
const dashboardRoutes = require("./routes/dashboard");
const mockInterviewRoutes = require("./routes/mockInterview");
const practiceRoutes = require("./routes/practice");
const attemptRoutes = require("./routes/attempt");
const adminRoutes = require("./routes/admin");
const learningRoutes = require("./routes/learning");
const app = express();
app.set("etag", false);
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/mock-interview", mockInterviewRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/attempt", attemptRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/learn", learningRoutes);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
