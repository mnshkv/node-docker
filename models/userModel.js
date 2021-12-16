const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "user must have a username"],
    unique: [true, "User must be uniq"],
  },
  password: {
    type: String,
    required: [true, "user must have a password"]
  }
})

const User = mongoose.model("User", userSchema);

module.exports = User;