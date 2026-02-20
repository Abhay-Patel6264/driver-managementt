<<<<<<< HEAD
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String
});

module.exports = mongoose.model("User", userSchema);
=======
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String
});

module.exports = mongoose.model("User", userSchema);
>>>>>>> 5492e12f5ab0d086ebffba66d1e86f786382f50e
