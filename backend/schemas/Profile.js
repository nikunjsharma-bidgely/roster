const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  empId: {
    type: String,
    required: true 
  },
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
module.exports = User = mongoose.model("profiles", ProfileSchema);