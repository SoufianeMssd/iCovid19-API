/* eslint-disable no-magic-numbers */
const express = require('express');
const corona = require('../models/corona');
const moment = require('moment');
const router = express.Router();

router.post('/', async (req, res) => {
  const {body: {cases, deaths, recovered, createAt}} = req;
  const coronaUpdate = new corona({cases, deaths, recovered, createAt});

  try {
    const savedUpdates = await coronaUpdate.save();
    res.status(200).json(savedUpdates);
  } catch (err) {
    res.json({message: err});
  }
});

router.get('/', async (req, res) => {
  const start = moment().startOf('day');
  const end = moment().endOf('day');
  try {
    const savedUpdates = await corona.find({createdAt: {$gte: start, $lt: end}});
    res.status(200).json(savedUpdates);
  } catch (err) {
    res.json({message: err});
  }
});

module.exports = router;
