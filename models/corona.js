const {Schema, model} = require('mongoose');

const coronaSchema = Schema({
  cases: {
    type: Number,
    required: true,
  },
  deaths: {
    type: Number,
    required: true,
  },
  recovered: {
    type: Number,
    required: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('corona', coronaSchema);
