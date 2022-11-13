const mongoose = require("mongoose");
const { Schema } = mongoose;

const ansSchema = new Schema({
  ansuid: String,
  data: String,
});

const answerSchema = new Schema({
  uid: String,
  formid: String,
  answerdata: [ansSchema],
});

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
