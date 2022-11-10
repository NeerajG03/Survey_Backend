const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSchema = new Schema({
  formid : String,
  formname : String,
  uid:  String,
  formdata:  String,
});

export default formSchema;