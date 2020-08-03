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
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('corona', coronaSchema);
