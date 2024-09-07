const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String, 
  },
 
}, {
  timestamps: true,
});


module.exports = mongoose.model('User', UserSchema);
