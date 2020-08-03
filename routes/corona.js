/* eslint-disable no-magic-numbers */
const express = require('express');
const corona = require('../models/corona');
const router = express.Router();

router.post('/', async (req, res) => {
  const {body: {cases, deaths, recovered}} = req;
  const coronaUpdate = new corona({cases, deaths, recovered});

  try {
    const savedUpdates = await coronaUpdate.save();
    res.status(200).json(savedUpdates);
  } catch (err) {
    res.json({message: err});
  }
});

module.exports = router;
