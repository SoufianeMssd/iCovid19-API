const {Schema, model} = require('mongoose');

const feedbackSchema = Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = model('feedback', feedbackSchema);
