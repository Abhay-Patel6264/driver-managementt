const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const User = require("./models/User");
const Attendance = require("./models/Attendance");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

/* ===== DATABASE ===== */

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err));

/* ===== DEFAULT ROUTE ===== */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

/* ===== LOGIN ===== */

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) {
    return res.json({ success: false });
  }

  res.json({
    success: true,
    role: user.role,
    username: user.username
  });
});

/* ===== MARK ATTENDANCE ===== */

app.post("/mark-attendance", async (req, res) => {
  const { driver, latitude, longitude, locationName } = req.body;

  const now = new Date();
  const date = now.toISOString().split("T")[0];

  const already = await Attendance.findOne({ driver, date });
  if (already) return res.json({ success: false, message: "Already Marked" });

  await Attendance.create({
    driver,
    date,
    day: now.toLocaleDateString("en-IN", { weekday: "long" }),
    time: now.toLocaleTimeString(),
    location: { latitude, longitude, locationName }
  });

  res.json({ success: true });
});

/* ===== GET ALL DATA ===== */

app.get("/attendance", async (req, res) => {
  const data = await Attendance.find().sort({ createdAt: -1 });
  res.json(data);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});
