/* eslint-disable no-magic-numbers */
const express = require('express');
const corona = require('../models/corona');
const router = express.Router();

router.post('/', async (req, res) => {
  const {body: {cases, deaths, recovered, date}} = req;
  const coronaUpdate = new corona({cases, deaths, recovered, date});

  try {
    const savedUpdates = await coronaUpdate.save();
    res.status(200).json(savedUpdates);
  } catch (err) {
    res.json({message: err});
  }
});

router.get('/', async (req, res) => {
  try {
    const savedUpdates = await corona.find();
    res.status(200).json(savedUpdates);
  } catch (err) {
    res.json({message: err});
  }
});

module.exports = router;
