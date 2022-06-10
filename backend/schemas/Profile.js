const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    default: Date.now
  },
  doj: {
    type: Date,
    default: Date.now
  },
  department: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
});
module.exports = User = mongoose.model("users", ProfileSchema);