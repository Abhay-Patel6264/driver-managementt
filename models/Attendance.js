const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  driver: String,
  date: String,
  day: String,
  time: String,
  location: {
    latitude: Number,
    longitude: Number,
    locationName: String
  },
  week: Number
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
