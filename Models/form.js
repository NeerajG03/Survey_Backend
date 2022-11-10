const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSchema = new Schema({
  uid: String,
  formid: String,
  formname: String,
  formdata: String,
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
