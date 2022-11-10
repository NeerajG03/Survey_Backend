const mongoose = require("mongoose");
const { Schema } = mongoose;

const formListSchema = new Schema({
  formid: String,
  formname: String,
});

const userSchema = new Schema({
  uid: String,
  email: String,
  name: String,
  forms: [formListSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
