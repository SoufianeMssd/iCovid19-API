/* eslint-disable no-magic-numbers */
const express = require('express');
const feedback = require('../models/feedback');
const User = require('../models/user');
const authenticate = require('../middleware/authenticate');
const moment = require('moment');
const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const {user: {id}, body: {message, createdAt}} = req;
  const newFeedback = new feedback({message, createdAt});

  try {
    const foundUser = await User.findById(id);
    newFeedback.owner = foundUser;
    const savedFeedback = await newFeedback.save();
    res.status(200).json(savedFeedback);
  } catch (err) {
    res.json({message: err});
  }
});

router.get('/', async (req, res) => {
  const start = moment().startOf('day');
  const end = moment().endOf('day');
  try {
    const feedbacks = await feedback.find({createdAt: {$gte: start, $lt: end}});
    res.status(200).json(feedbacks);
  } catch (err) {
    res.json({message: err});
  }
});

router.get('/me', authenticate, async (req, res) => {
  const {user: {id}} = req;
  try {
    const feedbacks = await feedback.find({owner: id});
    res.status(200).json(feedbacks);
  } catch (err) {
    res.json({message: err});
  }
});

module.exports = router;
