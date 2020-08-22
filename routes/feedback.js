/* eslint-disable no-magic-numbers */
const express = require('express');
const feedback = require('../models/feedback');
const User = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
  const {body: {message, createdAt, user}} = req;
  let foundUser = await User.findOne({email: user.email});

  if (!foundUser) {
    const newUser = new User({
      email: user.email,
      name: user.name,
      photoURL: user.photoURL,
    });
    foundUser = await newUser.save();
  }
  const newFeedback = new feedback({message, createdAt});
  newFeedback.owner = foundUser;

  try {
    const savedFeedback = await newFeedback.save();
    res.status(200).json(savedFeedback);
  } catch (err) {
    res.json({message: err});
  }
});


router.get('/', async (req, res) => {
  try {
    const feedbacks = await feedback.find().populate('owner').sort({createdAt: -1});
    res.status(200).json(feedbacks);
  } catch (err) {
    res.json({message: err.message});
  }
});

router.delete('/:_id', async (req, res) => {
  try {
    const {params: {_id}} = req;
    await feedback.deleteOne({_id});
    res.status(200).json({message: 'success'});
  } catch (err) {
    res.json({message: err.message});
  }
});

router.put('/:_id', async (req, res) => {
  const {body: {user}, params: {_id}} = req;
  const foundUser = await User.findOne({email: user.email});
  const foundFeedback = await feedback.findOne({_id});

  if (foundFeedback.likes.includes(foundUser.email)) {
    const index = foundFeedback.likes.indexOf(foundUser.email);
    foundFeedback.likes.splice(index, 1);
  } else {
    foundFeedback.likes.push(foundUser.email);
  }

  try {
    const savedFeedback = await foundFeedback.save();
    res.status(200).json(savedFeedback);
  } catch (err) {
    res.json({message: err});
  }
});

module.exports = router;
