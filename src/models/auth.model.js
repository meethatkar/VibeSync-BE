const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username is already taken, try another one"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email is already taken, try another one"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
});

const userModel = mongoose.model("user-clones", userSchema);

module.exports = userModel;
