const {Schema, model} = require('mongoose');

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photoURL: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('user', userSchema);
