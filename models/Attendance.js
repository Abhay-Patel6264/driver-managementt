<<<<<<< HEAD
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
=======
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
>>>>>>> 5492e12f5ab0d086ebffba66d1e86f786382f50e
