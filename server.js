const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");
const Attendance = require("./models/Attendance");

const app = express();
app.use(express.json());
app.use(cors());

/* ===== DATABASE CONNECTION ===== */

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err));

/* ===== LOGIN ===== */

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) {
    return res.json({ success: false });
  }

  res.json({
    success: true,
    role: user.role
  });
});

/* ===== MARK ATTENDANCE ===== */

app.post("/mark-attendance", async (req, res) => {
  const { driver, latitude, longitude, locationName } = req.body;

  const now = new Date();
  const today = now.toISOString().split("T")[0];

  const attendance = new Attendance({
    driver,
    date: today,
    day: now.toLocaleDateString("en-IN", { weekday: "long" }),
    time: now.toLocaleTimeString(),
    location: { latitude, longitude, locationName },
    week: 1
  });

  await attendance.save();

  res.json({ success: true });
});

/* ===== GET ATTENDANCE ===== */

app.get("/attendance", async (req, res) => {
  const data = await Attendance.find().sort({ createdAt: -1 });
  res.json(data);
});

/* ===== START SERVER ===== */

const PORT = 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});
