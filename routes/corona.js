/* eslint-disable no-magic-numbers */
const express = require('express');
const corona = require('../models/corona');
const router = express.Router();

router.post('/', async (req, res) => {
  const {body: {cases, deaths, recovered, createAt}} = req;
  const coronaUpdate = new corona({cases, deaths, recovered, createAt});

  try {
    const savedUpdates = await coronaUpdate.save();
    res.status(200).json(savedUpdates);
  } catch (err) {
    res.json({message: err.message});
  }
});

router.get('/', async (req, res) => {
  try {
    const savedUpdates = await corona.find().sort({createAt: 1});
    res.status(200).json(savedUpdates);
  } catch (err) {
    res.json({message: err.message});
  }
});


module.exports = router;
