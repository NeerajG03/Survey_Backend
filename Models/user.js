const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  uid:  String,
  email: String,
  name: String,
  forms:   [{formid: String, formname: String}],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
