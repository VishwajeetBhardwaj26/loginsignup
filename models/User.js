const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confpassword: {
    type: String,
    required: true
  }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
